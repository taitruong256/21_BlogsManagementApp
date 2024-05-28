## 1. KẾ HOẠCH

### 1.1 Mô tả ý tưởng đề tài

Ứng dụng quản lý blog cá nhân là một nền tảng trực tuyến cho phép người dùng tạo, quản lý và chia sẻ bài viết của họ. Mục tiêu của ứng dụng này là cung cấp một không gian trực quan và dễ sử dụng cho người dùng để viết blog, tải lên hình ảnh, nhận phản hồi từ độc giả thông qua bình luận, và quản lý nội dung của họ. Ứng dụng sẽ hỗ trợ các tính năng như tạo bài viết, chỉnh sửa bài viết, xóa bài viết, quản lý tài khoản người dùng, bình luận để tương tác với người xem, theo dõi thông tin hấp dẫn và hỗ trợ đa phương tiện (hình ảnh, video).

Đối tượng người dùng
- Blogger cá nhân: Những người đam mê viết blog, chia sẻ kiến thức, kinh nghiệm cá nhân.
- Doanh nghiệp nhỏ: Các doanh nghiệp muốn xây dựng một blog để tăng cường marketing và tương tác với khách hàng.
- Nhà văn tự do: Những người viết lách chuyên nghiệp muốn có một nền tảng để xuất bản và quảng bá tác phẩm của mình.

### 1.2 Sản phẩm MVP

Một ứng có thể: 
- Tạo bài viết mới với tiêu đề, nội dung và hình ảnh.
- Chỉnh sửa bài viết hiện có.
- Xóa bài viết.

### 1.3 Sản phẩm hoàn thiện
#### 1.3.1 Quản lý người dùng:

- Đăng ký, đăng nhập và đăng xuất tài khoản.
- Chỉnh sửa thông tin cá nhân.
- Đặt lại mật khẩu.

#### 1.3.2 Quản lý bài viết:

- Tạo bài viết mới với tiêu đề, mô tả, nội dung, hình ảnh, lượt xem, lượt tác tác.
- Hỗ trợ markdown và xem trước cho nội dung bài viết. 
- Chỉnh sửa bài viết hiện có.
- Xóa bài viết.

#### 1.3.3  Quản lý bình luận:

- Thêm bình luận vào bài viết.
- Xóa bình luận (chỉ người dùng hoặc quản trị viên mới có quyền xóa bình luận của mình).
- Hỗ trợ phản hồi, bình luận nhiều cấp 

#### 1.3.4 Tính năng tương tác xã hội:

- Theo dõi bài viết 
- Nhận thông báo mới khi có bình luận mới, có người theo dõi 

#### 1.3.5 Giao diện người dùng:

- Trang chủ hiển thị danh sách các bài viết.
- Trang chi tiết bài viết hiển thị nội dung bài viết và các bình luận.
- Trang quản lý tài khoản cá nhân.
- Trang tạo bài viết bằng các công cụ chỉnh sửa văn bản thân thiện với người dùng

![](https://i.imgur.com/w4dZJtF.png)

## 2. PHÂN TÍCH

### 2.1 Giới thiệu

#### 2.1.1 Mục đích

Mục đích của tài liệu này nhằm mô tả một cách đầy đủ và toàn diện các yêu cầu của ứng dụng quản lý blog cá nhân, bao gồm các yêu cầu chức năng, yêu cầu phi chức năng, và các ràng buộc về mặt thiết kế. Tài liệu này sẽ giúp các nhà phát triển, tester, và các bên liên quan khác hiểu rõ hơn về hệ thống và đảm bảo rằng mọi người đều có chung một định hướng trong quá trình phát triển ứng dụng.

#### 2.1.2 Phạm vi

Ứng dụng quản lý blog cá nhân là một nền tảng trực tuyến cho phép người dùng tạo, quản lý và chia sẻ bài viết của họ. Ứng dụng này sẽ phục vụ các blogger cá nhân, nhà văn tự do, và các doanh nghiệp nhỏ. Các hệ thống con bao gồm quản lý người dùng, quản lý bài viết, quản lý bình luận, và giao diện người dùng.

Tài liệu này dành cho các nhà phát triển phần mềm, tester, và các bên liên quan khác như quản lý dự án và khách hàng.

### 2.2 Phân tích yêu cầu

#### 2.2.1 Đặc tả Actors

- **Actor 1: Quản trị viên (Admin)**: Quản trị viên có quyền cao nhất, có thể quản lý tất cả các tài khoản người dùng, duyệt và xóa bài viết, quản lý các bình luận, và thực hiện các tác vụ bảo trì hệ thống.

- **Actor 2: Tác giả (Author)**: Tác giả có thể tạo, chỉnh sửa, xóa bài viết và bình luận của mình. Tác giả cũng có thể tìm kiếm bài viết, cập nhật thông tin cá nhân.

- **Actor 3: Độc giả (Reader)**: Độc giả có thể xem bài viết, xem bình luận, đăng bình luận, tìm kiếm bài viết, và theo dõi tác giả hoặc bài viết yêu thích.

#### 2.2.2 Đặc tả Use-cases

Danh sách các use-cases:

- **UC01: Đăng nhập**: Người dùng nhập tên đăng nhập và mật khẩu để truy cập vào hệ thống.

- **UC02: Thống kê**: Quản trị viên xem thống kê về số lượng bài viết, số lượng người dùng, và hoạt động của hệ thống.

- **UC03: Đăng bài viết**: Tác giả tạo một bài viết mới với tiêu đề, nội dung, và hình ảnh.

- **UC04: Chỉnh sửa bài viết**: Tác giả chỉnh sửa bài viết hiện có của mình.

- **UC05: Xóa bài viết**: Tác giả xóa bài viết của mình.

- **UC06: Đăng ký tài khoản**: Người dùng tạo một tài khoản mới với thông tin cá nhân cơ bản.

- **UC07: Đặt lại mật khẩu**: Người dùng quên mật khẩu và yêu cầu đặt lại mật khẩu.

- **UC08: Bình luận trên bài viết**: Người dùng thêm bình luận vào một bài viết.

- **UC09: Quản lý người dùng**: Quản trị viên thêm, xóa, hoặc chỉnh sửa thông tin người dùng.

- **UC10: Quản lý bình luận**: Quản trị viên duyệt và xóa các bình luận không phù hợp.

- **UC11: Theo dõi bài viết và tác giả**: Độc giả theo dõi các tác giả hoặc bài viết yêu thích và nhận thông báo khi có bài viết mới hoặc bình luận mới.

- **UC12: Tìm kiếm bài viết**: Người dùng tìm kiếm các bài viết dựa trên từ khóa.

- **UC13: Cập nhật thông tin cá nhân**: Tác giả cập nhật thông tin cá nhân của mình như tên, ảnh đại diện, và mô tả.

Liệt kê các use-cases theo actor:

- **Actor 1: Quản trị viên**
  - UC01: Đăng nhập
  - UC02: Thống kê
  - UC09: Quản lý người dùng
  - UC10: Quản lý bình luận
  - UC03: Đăng bài viết
  - UC04: Chỉnh sửa bài viết
  - UC05: Xóa bài viết
  - UC08: Bình luận trên bài viết
  - UC12: Tìm kiếm bài viết

- **Actor 2: Tác giả**
  - UC01: Đăng nhập
  - UC03: Đăng bài viết
  - UC04: Chỉnh sửa bài viết
  - UC05: Xóa bài viết
  - UC08: Bình luận trên bài viết
  - UC12: Tìm kiếm bài viết
  - UC13: Cập nhật thông tin cá nhân

- **Actor 3: Độc giả**
  - UC01: Đăng nhập
  - UC06: Đăng ký tài khoản
  - UC07: Đặt lại mật khẩu
  - UC08: Bình luận trên bài viết
  - UC11: Theo dõi bài viết và tác giả
  - UC12: Tìm kiếm bài viết

## 3. THIẾT KẾ

### 3.1. Activity Diagram

### 3.2. ER Diagram

### 3.3. Database Diagram
 ![](https://i.imgur.com/xxNuAoS.png)

Sơ đồ trên Hệ quản trị CSDL

### 3.4. Screen flow

Sơ đồ phân luồng màn hình ứng dụng

![Sơ đồ luồng màn hinh](./images/screen-flow.png)

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

## 5. GHI CHÚ CÁC CÔNG VIỆC

### 5.1 Phân công

## Bảng phân công công việc của các thành viên trong team

| Thành viên            | Nhiệm vụ                                                                                              |
|-----------------------|-------------------------------------------------------------------------------------------------------|
| **Trương Đức Tài**    | - Vẽ sơ đồ use case, tạo project, chia app                                                            |
|                       | - Vẽ database diagram và code model                                                                   |
|                       | - Code back-end, viết API trả về tất cả bài viết; thêm, sửa, xóa bài viết                             |
|                       | - Code và hoàn thiện tính năng bình luận, theo dõi                                                    |
|                       | - Gắn sự kiện chuyển trang giữa các trang                                                             |
|                       | - Tạo chức năng đăng bài viết có các công cụ chỉnh sửa bằng markdown                                  |
| **Lâm Quang Phú**     | - Vẽ database diagram và code model                                                                   |
|                       | - Code back-end, viết API tìm kiếm bài viết theo chủ đề, tác giả                                       |
|                       | - Code tính năng đăng nhập, đăng ký, đăng xuất                                                        |
|                       | - Hoàn thiện sự kiện trang chủ                                                                        |
|                       | - Code trang hiển thị và chỉnh sửa thông tin người dùng, gắn sự kiện theo dõi bạn bè                  |
|                       | - Báo cáo đề tài                                                                                      |
| **Dương Trần Kim Ngân**| - Code front-end, vẽ figma và code giao diện của trang chủ, trang kết quả tìm kiếm, trang chi tiết bài viết  |
|                       | - Bắt và hiển thị API từ back-end trên trang chủ, chi tiết                                            |
|                       | - Code front-end, vẽ figma và code giao diện trang chi tiết bài viết có tính năng thả cảm xúc bài, bình luận |
|                       | - Hoàn thiện trang chủ, chi tiết bài viết và thêm bài viết                                            |
|                       | - Viết báo cáo, soạn slide                                                                            |
| **Đào Xuân Hoàng Tuấn**| - Vẽ figma trang đăng nhập, đăng ký                                                                 |
|                       | - Vẽ figma trang bài viết cá nhân                                                                     |
|                       | - Tìm hiểu về các công cụ có thể chuyển văn bản được định dạng sang HTML sao cho thân thiện với người dùng |
|                       | - Code front-end trang tạo bài viết, tạo giao diện có các công cụ có thể chỉnh sửa bằng markdown       |
|                       | - Cào dữ liệu để tự động script vào database                                                          |


### 5.2 Nhật ký

**Thời gian thực hiện:** Từ 7/4/2024 đến 28/5/2024 (7 tuần)

| Hạng Mục                             | PIC/TIC                         | Trạng Thái | Tiến độ | Ghi chú                                                                                 |
|--------------------------------------|---------------------------------|------------|---------|-----------------------------------------------------------------------------------------|
| **Tuần 01**                          |                                 |            |         |                                                                                         |
| Tìm hiểu cách viết rest API          | Mọi người                       | Done       | 100%    |                                                                                         |
| Tìm hiểu soạn doc, slide demo        | Đào Xuân Hoàng Tuấn             | Done       | 100%    | Tìm hiểu cách cào dữ liệu từ vựng theo chủ đề                                           |
| Cào dữ liệu từ vựng theo chủ đề      | Đào Xuân Hoàng Tuấn             | Done       | 100%    | Từ tiếng Anh và từ tiếng Việt tương ứng, kèm theo động từ, tính từ danh từ nếu có…     |
| Front end                            | Dương Trần Kim Ngân             | Done       | 100%    | Thanh tìm kiếm, thêm từ (động từ, danh từ, tính từ, option chủ đề)                     |
|                                      |                                 |            |         | Menu chủ đề, load từ ở trang chủ                                                        |
| REST API, Model database             | Trương Đức Tài, Lâm Quang Phú   | Done       | 100%    | Thêm: Tài; Sửa: Tài; Xóa: Tài; Tìm kiếm: Phú; Load all: Phú; Model: Phú                |
| **Tuần 02**                          |                                 |            |         |                                                                                         |
| Đăng nhập, đăng ký                   | Đào Xuân Hoàng Tuấn, Quang Phú  | Doing      | 100%    | Vẽ figma, field dữ liệu; Code trang đăng nhập, đăng ký; 1 doc field                    |
| Trang cá nhân                        | Đào Xuân Hoàng Tuấn, Quang Phú  | Doing      | 100%    | Vẽ figma, field dữ liệu; Code trang cá nhân; 1 doc field                                |
| Trang chủ, trang kết quả tìm kiếm    | Dương Trần Kim Ngân             | Doing      | 100%    | Vẽ figma, code html, js trang chủ                                                       |
| Database model, server django, chia source | Trương Đức Tài, Lâm Quang Phú | Doing      | 100%    | Mô hình hóa django, Schema database                                                     |
| **Tuần 03**                          |                                 |            |         |                                                                                         |
| Đăng nhập, đăng ký                   | Đào Xuân Hoàng Tuấn, Quang Phú  | Doing      | 100%    | Thực hiện code tiếp trang đăng nhập, đăng ký; 1 doc field                               |
| Trang cá nhân                        | Đào Xuân Hoàng Tuấn, Quang Phú  | Doing      | 100%    | Vẽ lại figma, field dữ liệu; Code trang cá nhân; 1 doc field                            |
| Trang chủ, trang kết quả tìm kiếm    | Dương Trần Kim Ngân             | Doing      | 100%    | Code tiếp theo figma, code html, js trang chủ                                           |
| Vẽ use case, kiến trúc django blog   | Trương Đức Tài                  | Doing      | 100%    | Tạo model db dưới field của Ngân.                                                       |
| Pandoc                               | Đào Xuân Hoàng Tuấn             | Doing      | 100%    | Tìm hiểu và tạo trang demo sử dụng pandoc để tạo blog. Tìm hiểu pandoc cần lưu trữ hay triển khai như thế nào xuống database. |
| **Tuần 04**                          |                                 |            |         |                                                                                         |
| Đăng nhập, đăng ký                   | Lâm Quang Phú                   | Done       | 100%    | Viết API đăng nhập, đăng ký                                                             |
| Trang tạo bài viết                   | Dương Trần Kim Ngân             | Doing      | 100%    | Vẽ figma, code html, js giao diện thêm, sửa, xóa bài viết                               |
| Trang tạo bài viết                   | Trương Đức Tài                  | Done       | 100%    | Viết API thêm, sửa, xóa bài viết                                                        |
| Pandoc                               | Đào Xuân Hoàng Tuấn             | Doing      | 100%    | Code tiếp demo pandoc; Vẽ figma trang cập nhật thông tin cá nhân                        |
| **Tuần 05**                          |                                 |            |         |                                                                                         |
| Database                             | Lâm Quang Phú, Trương Đức Tài   | Doing      | 100%    | Schema database                                                                         |
| Trang tạo bài viết                   | Dương Trần Kim Ngân             | Doing      | 100%    | Vẽ figma, code html, js giao diện chi tiết bài viết (có comment, cảm xúc bài bài viết) |
| Tạo dữ liệu mẫu, viết API tìm kiếm   | Trương Đức Tài                  | Doing      | 100%    |                                                                                         |
| Thiết kế và code trang chi tiết bài viết | Đào Xuân Hoàng Tuấn         | Doing      | 100%    | Vẽ figma, code html, js giao diện thêm, sửa, xóa bài viết                               |
| Hoàn thiện sự kiện trang chủ         | Lâm Quang Phú                   | Doing      | 100%    | Gắn API, bắt sự kiện trên FE                                                            |
| **Tuần 06**                          |                                 |            |         |                                                                                         |
| Database                             | Lâm Quang Phú, Trương Đức Tài   | Doing      | 100%    | Schema database                                                                         |
| Trang chi tiết bài viết              | Trương Đức Tài, Dương Trần Kim Ngân | Doing  | 100%    | Code tính năng bình luận; Code giao diện                                                |
| Viết API tìm kiếm theo điều kiện     | Lâm Quang Phú                   | Doing      | 100%    |                                                                                         |
| Code FE trang cá nhân                | Lâm Quang Phú                   | Doing      | 100%    |                                                                                         |
| Làm chức năng đăng bài, giao diện có các công cụ tạo edit bài đăng bằng markdown bằng Django | Đào Xuân Hoàng Tuấn | Doing  | 100%    |                                                                                         |
| **Tuần 07**                          |                                 |            |         |                                                                                         |
| Database                             | Lâm Quang Phú, Trương Đức Tài   | Doing      | 100%    | Schema database                                                                         |
| Trang chi tiết bài viết              | Trương Đức Tài, Dương Trần Kim Ngân | Doing  | 100%    | Update giao diện comment; Xử lý sự kiện theo dõi, thả tim                               |
| Viết API tìm kiếm người dùng theo bộ lọc | Lâm Quang Phú                | Doing      | 100%    |                                                                                         |
| Làm chức năng đăng bài, giao diện có các công cụ tạo edit bài đăng bằng markdown bằng Django | Đào Xuân Hoàng Tuấn | Doing  | 100%    |                                                                                         |
| Trang chỉnh sửa thông tin người dùng | Lâm Quang Phú                   | Doing      | 100%    |                                                                                         |
| Sinh data blog                       | Dương Trần Kim Ngân             | Doing      | 100%    |                                                                                         |


## 6. THAM KHẢO

[1] MDN Web Docs: HTML/CSS [LINK](https://developer.mozilla.org/en-US/docs/Web/HTML)

[2] MDN Web Docs: JavaScript [LINK](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[3] Bootstrap Documentation [LINK](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

[4] Django Documentation [LINK](https://docs.djangoproject.com/en/stable/)

[5] Django REST Framework Documentation [LINK](https://www.django-rest-framework.org/)

[6] SQLite Documentation [LINK](https://www.sqlite.org/docs.html)

[7] django-widget-tweaks Documentation [LINK](https://django-widget-tweaks.readthedocs.io/en/latest/)

[8] django-ckeditor Documentation [LINK](https://django-ckeditor.readthedocs.io/en/latest/)

[9] django-filter Documentation [LINK](https://django-filter.readthedocs.io/en/stable/)

[10] Pillow Documentation [LINK](https://pillow.readthedocs.io/en/stable/)