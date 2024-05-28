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

