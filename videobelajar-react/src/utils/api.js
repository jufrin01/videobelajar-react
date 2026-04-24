import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

// REQUEST INTERCEPTOR (Sebelum Request Dikirim)
api.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('accessToken');

        if (token) {
            token = token.replace(/^"(.*)"$/, '$1');

            // Menyisipkan token ke header Authorization
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR (Setelah Response Diterima)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Jika error 401/403 dan belum pernah di-retry
        if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                let refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error("Tidak ada refresh token");

                // Bersihkan tanda kutip juga untuk refresh token
                refreshToken = refreshToken.replace(/^"(.*)"$/, '$1');

                const res = await axios.post('http://localhost:5000/users/refresh-token', {
                    token: refreshToken
                });

                // Simpan token baru
                localStorage.setItem('accessToken', res.data.accessToken);

                // Update header dengan token baru dan jalankan ulang request yang gagal
                originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
                return api(originalRequest);

            } catch (err) {
                console.error("Sesi telah habis, silakan login kembali.");
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // Lempar user ke halaman login
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;