export const getErrorMessage = (error) => {
    const data = error?.response?.data

    if (typeof data === 'string' && data.trim()) {
        return data
    }

    const message = data?.message ?? data?.error ?? error?.message
    if (typeof message === 'string' && message.trim()) {
        return message
    }

    return 'Произошла ошибка. Попробуйте ещё раз.'
}
