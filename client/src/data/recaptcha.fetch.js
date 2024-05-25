const API_URL = `${import.meta.env.VITE_APP_API_URL}/mail`

export const verifyCaptcha = (captcha) => {
    const formData = new FormData()
    formData.append('captcha', captcha)

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/verify-captcha`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
