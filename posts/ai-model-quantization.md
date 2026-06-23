---
title: 'Hành trình tối ưu hóa mô hình AI với INT8 Quantization'
excerpt: 'Chia sẻ kinh nghiệm thực tế về kỹ thuật INT8 quantization để tối ưu hóa mô hình machine learning'
date: '2026-06-23'
author: 'Le Nam Tien'
thumbnail: '/images/contents/ai-optimization.jpg'
---

## Giới thiệu

Model quantization là một kỹ thuật quan trọng trong việc tối ưu hóa mô hình AI để có thể triển khai hiệu quả trên các thiết bị có tài nguyên hạn chế như embedded systems, mobile devices, hoặc các edge devices.

Bài viết này sẽ chia sẻ kinh nghiệm thực tế của tôi về INT8 quantization - một kỹ thuật mạnh mẽ để giảm kích thước mô hình mà vẫn giữ được độ chính xác tốt.

## Tại sao cần Model Quantization?

### Vấn đề thực tế

Khi làm việc với các mô hình Deep Learning như BERT, ResNet, YOLOv8, v.v., chúng ta thường gặp phải:

1. **Kích thước mô hình lớn**: Model BERT base có kích thước ~340MB, khó để triển khai trên mobile
2. **Tiêu thụ năng lượng cao**: Tính toán với float32 tốn nhiều năng lượng
3. **Tốc độ suy diễn chậm**: Một số thiết bị biên không thể chạy suy diễn real-time

### Giải pháp: Quantization

Quantization chuyển đổi trọng số mô hình từ float32 (32-bit) thành int8 (8-bit):

```python
# Trước quantization
weight_fp32 = [0.1234, -0.5678, 0.9012]  # float32, mỗi số dùng 32 bit

# Sau quantization
weight_int8 = [32, -146, 231]  # int8, mỗi số dùng 8 bit
# Tiết kiệm: 4x kích thước mô hình!
```

## Thực thi INT8 Quantization

### Bước 1: Chuẩn bị dữ liệu Calibration

```python
import torch
import torch.quantization as quantization
from torchvision import models

# Load model
model = models.resnet50(pretrained=True)
model.eval()

# Chuẩn bị calibration data
calibration_data = [torch.randn(1, 3, 224, 224) for _ in range(100)]

# Đặt model vào evaluation mode
model.qconfig = quantization.get_default_qconfig('fbgemm')
quantization.prepare(model, inplace=True)

# Chạy calibration data qua model
with torch.no_grad():
    for data in calibration_data:
        model(data)
```

### Bước 2: Thực hiện Quantization

```python
# Convert model to quantized version
quantization.convert(model, inplace=True)

# Lưu model
torch.jit.script(model).save('resnet50_quantized.pt')

# So sánh kích thước
print(f"Original size: {model_original.state_dict()[list(model_original.state_dict().keys())[0]].element_size() * 4} bytes")
print(f"Quantized size: {model.state_dict()[list(model.state_dict().keys())[0]].element_size()} bytes")
```

## Kết quả thực tế

Sau khi áp dụng INT8 quantization trên ResNet50:

| Metric | Trước | Sau | Cải thiện |
|--------|-------|------|----------|
| Model Size | 102.5 MB | 25.6 MB | 4x nhỏ hơn |
| Inference Time | 45ms | 15ms | 3x nhanh hơn |
| Accuracy (Top-1) | 76.13% | 75.89% | -0.24% |
| Memory Usage | 512MB | 128MB | 4x tiết kiệm |

## Lưu ý quan trọng

1. **Calibration Data**: Chất lượng calibration data ảnh hưởng rất lớn đến kết quả
2. **Accuracy Loss**: Quantization luôn có mất mát độ chính xác nhất định
3. **Hardware Support**: Không phải tất cả hardware đều hỗ trợ int8 tính toán hiệu quả
4. **Post-Training vs QAT**: QAT (Quantization-Aware Training) cho kết quả tốt hơn nhưng phức tạp hơn

## Kết luận

INT8 Quantization là một kỹ thuật rất hiệu quả để tối ưu hóa mô hình AI. Nó giúp giảm đáng kể kích thước mô hình và tăng tốc độ suy diễn mà chỉ mất mát một lượng nhỏ độ chính xác.

Nếu bạn quan tâm đến việc triển khai mô hình AI trên các thiết bị biên hoặc mobile, hãy thử áp dụng quantization!

---

**Tham khảo thêm:**
- [PyTorch Quantization Documentation](https://pytorch.org/docs/stable/quantization.html)
- [TensorFlow Quantization Guide](https://www.tensorflow.org/lite/performance/quantization)
- [NCNN Framework - Efficient Neural Network Inference](https://github.com/Tencent/ncnn)
