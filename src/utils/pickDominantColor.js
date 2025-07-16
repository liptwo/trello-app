import ColorThief from 'colorthief'
import React from 'react'

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

function pickDominantColor(imgUrl) {
  // Nếu không có url ảnh, trả về màu mặc định
  if (!imgUrl) return '#e0e4ea'

  // Trả về một Promise để xử lý bất đồng bộ việc lấy màu dominant
  return new Promise((resolve, reject) => {
    // Tạo một đối tượng hình ảnh mới trên trình duyệt
    const image = new window.Image()
    // Thiết lập crossOrigin để có thể lấy dữ liệu ảnh từ domain khác (CORS)
    image.crossOrigin = 'Anonymous'
    // Gán đường dẫn ảnh cho đối tượng image
    image.src = imgUrl
    // Khi ảnh tải xong, thực hiện lấy màu dominant
    image.onload = () => {
      try {
        // Tạo một đối tượng ColorThief để lấy màu dominant từ ảnh
        const colorThief = new ColorThief()
        // Lấy mảng màu [r, g, b] dominant từ ảnh
        const color = colorThief.getColor(image)
        // Chuyển mảng màu sang mã hex và trả về qua resolve
        resolve(rgbToHex(color[0], color[1], color[2]))
      } catch (err) {
        // Nếu có lỗi khi lấy màu, trả về màu mặc định
        resolve('#e0e4ea')
      }
    }
    // Nếu ảnh lỗi không tải được, trả về màu mặc định
    image.onerror = () => resolve('#e0e4ea')
  })
}

export default pickDominantColor
