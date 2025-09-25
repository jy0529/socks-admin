
// https://xxxx.com/yyy.jpg -> yyy.jpg
export const getImageName = (url: string) => {
    return url.split('/').pop()
}
