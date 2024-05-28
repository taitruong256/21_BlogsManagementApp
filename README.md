# GreenBlog

- **GreenBlog** là một ứng dụng quản lý blog cá nhân giúp người dùng dễ dàng tạo, chỉnh sửa, và quản lý các bài viết của mình. Ứng dụng này hướng đến các đối tượng người dùng như bloggers, nhà văn tự do, và bất kỳ ai muốn chia sẻ suy nghĩ hoặc kiến thức của mình qua các bài viết. Các chức năng chính của ứng dụng bao gồm tạo bài viết mới, chỉnh sửa bài viết hiện có, quản lý danh sách bài viết, phân loại bài viết theo chuyên mục, tương tác với độc giả qua phần bình luận và theo dõi kết bạn với bạn bè.

- Bạn có thể trải nghiệm ứng dụng ở đây [LINK](http://127.0.0.1:8000/home/)

- Một số sceenshot của ứng dụng

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

## CÀI ĐẶT

Dưới đây là hướng dẫn chi tiết để cài đặt và chạy dự án sau khi pull từ Github về:

1. Các phần mềm cần cài đặt

- Python 3.10: Ngôn ngữ lập trình chính của dự án.
- Git: Để clone repository từ Github.
- Virtualenv: Để tạo môi trường ảo cho Python.
- SQLite: Cơ sở dữ liệu để lưu trữ dữ liệu của dự án.

2. Các gói thư viện Python cần dùng

Trước tiên, đảm bảo bạn đang ở thư mục gốc của dự án và đã tạo một môi trường ảo để tải danh sách các gói thư viện cần thiết:

    pip freeze > requirements.txt

Nội dung file requirements.txt giống như sau:

    Django==3.2.5
    django-widget-tweaks==1.4.8
    django-ckeditor==6.0.0
    djangorestframework==3.12.4
    markdown==3.3.4
    django-filter==2.4.0
    Pillow==8.2.0
    
3. Hướng dẫn cài đặt

Bước 1: Clone repository từ Github

    git clone https://github.com/taitruong256/21_BlogsManagementApp.git
    cd 21_BlogsManagementApp

Bước 2: Tạo và kích hoạt môi trường ảo

    python -m venv venv
    
Bước 3: Cài đặt các gói thư viện Python

    pip install -r requirements.txt
    
Bước 4. Chạy ứng dụng

    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver


## THÔNG TIN THÀNH VIÊN

- Trương Đức Tài - 21078321
- Lâm Quang Phú - 21094601
- Dương Trần Kim Ngân - 21025511
- Đào Xuần Hoàng Tuấn - 21114651


## TRÁCH NHIỆM

- Trương Đức Tài
    - Vẽ sơ đồ use case, tạo project, chia app
    - Vẽ database diagram và code model 
    - Code back-end, viết API trả về tất cả bài viết; thêm, sửa, xóa bài viết 
    - Code và hoàn thiện tính năng bình luận, theo dõi  
    - Gắn sự kiện chuyển trang giữa các trang 
    - Tạo chức năng đăng bài viết có các công cụ chỉnh sửa bằng markdown 
- Lâm Quang Phú
    - Vẽ database diagram và code model 
    - Code back-end, viết API tìm kiếm bài viết theo chủ đề, tác giả. 
    - Code tính năng đăng nhập, đăng ký, đăng xuất 
    - Hoàn thiện sự kiện trang chủ 
    - Code trang hiển thị và chỉnh sửa thông tin người dùng, gắn sự kiện theo dõi bạn bè 
    - Báo cáo đề tài 
- Dương Trần Kim Ngân 
    - Code font-end, vẽ figma và code giao diện của trang chủ, trang kết quả tìm kiếm, trang chi tiết bài viết 
    - Bắt và hiển thị API từ back-end trên trang chủ, chi tiết 
    - Code font-end, vẽ figma và code giao diện trang chi tiết bài viết có tính năng thả cảm xúc bài, bình luận
    - Hoàn thiện trang trang chủ, chi tiết bài viết và thêm bài viết
    - Viết báo cáo, soạn slide 
- Đào Xuân Hoàng Tuấn 
    - Vẽ figma trang đăng nhập, đăng ký
    - Vẽ figma trang bài viết cá nhân 
    - Tìm hiểu về các công cụ có thể chuyển văn bản được định dạng sang HTML sao cho thân thiện với người dùng 
    - Code font-end trang tạo bài viết, tạo giao diện có các công cụ có thể chỉnh sửa bằng markdown 
    - Cào dữ liệu để tự động script vào database
