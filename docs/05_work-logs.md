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
