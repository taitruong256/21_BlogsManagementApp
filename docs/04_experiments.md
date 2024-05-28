## 4. HIỆN THỰC

### 4.1. Công nghệ sử dụng

Ứng dụng quản lý blog cá nhân được phát triển bằng các công nghệ sau:

- **Front-end**:
  - **HTML/CSS**: Sử dụng để xây dựng giao diện người dùng.
  - **JavaScript**: Sử dụng để tạo các tính năng tương tác động.
  - **Bootstrap**: Một framework CSS giúp tạo giao diện web thân thiện với người dùng và responsive.

- **Back-end**:
  - **Django**: Một framework web Python giúp xây dựng các ứng dụng web nhanh chóng và dễ dàng.
  - **Django REST Framework (DRF)**: Sử dụng để xây dựng API cho ứng dụng.
  - **SQLite**: Cơ sở dữ liệu mặc định sử dụng trong quá trình phát triển.
  
- **Extensions**:
  - **django-widget-tweaks**: Sử dụng để tùy chỉnh các widget trong form của Django.
  - **django-ckeditor**: Một trình soạn thảo văn bản trực tuyến cho phép tác giả viết và chỉnh sửa bài viết.
  - **django-filter**: Sử dụng để tạo các bộ lọc trong API.
  - **Pillow**: Thư viện xử lý hình ảnh trong Python, sử dụng để quản lý các hình ảnh tải lên trong bài viết.

### 4.2. Giao diện ứng dụng

Chụp hình một số screenshots của ứng dụng:

    Màn hình trang chủ 
    
     ![](https://i.imgur.com/VR8bf3h.png)
     
    Màn hình trang chi tiết 
    
     ![](https://i.imgur.com/qiW2MUh.png)
     
    Màn hình bình luận, tương tác 
    
     ![](https://i.imgur.com/Bm2wAgO.png)
     
    Màn hình thêm bài viết 
    
     ![](https://i.imgur.com/qAmFKxh.png)
     
    Màn hình trang cá nhân 
    
     ![](https://i.imgur.com/l09mFni.png)


### 4.3. Kết quả

#### Làm được

- Xây dựng giao diện người dùng cơ bản bao gồm trang chủ, trang đăng nhập, trang đăng ký, và trang viết bài.
- Tạo hệ thống đăng nhập và đăng ký tài khoản.
- Xây dựng chức năng viết, chỉnh sửa, và xóa bài viết.
- Quản lý người dùng và bài viết thông qua giao diện quản trị.
- Tạo và quản lý bình luận dưới các bài viết.
- Hỗ trợ tìm kiếm bài viết dựa trên từ khóa.
- Chức năng theo dõi tác giả và bài viết yêu thích.
- Có các công cụ tùy chỉnh để người dùng có thể tạo các bài viết theo sở thích, phong cách cá nhân hoặc tạo bằng html. 

#### Chưa làm được
- Chưa có thông báo mới khi có người theo dõi hoặc tác giả đang theo dõi đăng bài viết.
- Chưa đồng bộ cho các truy vấn phức tạp, cần thời gian chờ nhiệm vụ trước hoàn thành thì mới thực hiện được nhiệm vụ hiện tại.

#### Hướng phát triển

- **Tối ưu hóa hiệu suất**: Cải thiện tốc độ và hiệu suất của ứng dụng, đặc biệt là với các truy vấn phức tạp và số lượng lớn người dùng.
- **Hỗ trợ đa ngôn ngữ**: Thêm chức năng hỗ trợ đa ngôn ngữ để phục vụ người dùng quốc tế.
- **Thông báo thời gian thực**: Phát triển hệ thống thông báo thời gian thực để cập nhật ngay lập tức các hoạt động trên blog.
- **Tăng cường bảo mật**: Thực hiện các biện pháp bảo mật bổ sung để bảo vệ dữ liệu người dùng và đảm bảo an toàn cho hệ thống.