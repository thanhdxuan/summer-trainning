= Hiện thực
Toàn bộ thông tin về mã nguồn của hệ thống được lưu trữ tại link Github: #link("https://github.com/thanhdxuan/summer-trainning")[https://github.com/thanhdxuan/summer-trainning]
== Tổng quan kiến trúc hệ thống
Ở đây, sinh viên sử dụng kiến trúc MVC (Model - View - Controller) để thiết kế ứng dụng.
- *Model*: Các model để lưu trữ dữ liệu của hệ thống như *Topics*, *Users*, ...
- *View*: Các module, component sử dụng ReactJS để hiện thực, giúp người dùng thao tác với giao diện trang web, từ đó thực hiện các yêu cầu (request) thông qua các REST API được phía server cung cấp.
- *Controller*: Là các module, routes để xử lý các yêu cầu từ *View*, từ đó thực hiện các logic cần thiết, cũng như query dữ liệu từ *Model* nếu cần thiết sau đó trả kết quả về cho *View* dưới dạng JSON để hiển thị.
#figure(
   caption: [Tổng quan kiến trúc hệ thống],
   image("architecture.png")
)
*Bảo mật*
\
Ở đây, hệ thống sử dụng JWT (JSON Web Token), để xác nhận người dùng trước khi sử dụng hệ thống.\

JWT là một chuỗi ký tự có ba phần chính: Header, Payload và Signature. Header chứa các thông tin về loại mã hóa và thuật toán được sử dụng. Payload chứa các thông tin tùy chỉnh được gửi kèm trong token, ví dụ như thông tin người dùng và quyền truy cập. Signature được tạo bằng cách ký (sign) Header và Payload bằng một khóa bí mật duy nhất, để đảm bảo tính xác thực của token. Khóa bí mật này thường được lưu trữ ở phía server.

Quá trình hoạt động của JWT như sau:

- Người dùng gửi yêu cầu xác thực đến máy chủ.
- Máy chủ xác thực thông tin người dùng và tạo một JWT.
- JWT được gửi trở lại cho người dùng.
- Người dùng gửi JWT trong mỗi yêu cầu tiếp theo.
- Máy chủ xác thực JWT bằng cách kiểm tra tính hợp lệ, xác minh chữ ký và kiểm tra quyền truy cập.
- Nếu JWT hợp lệ, máy chủ trả về kết quả yêu cầu cho người dùng.

Khi người dùng đăng nhập trang web, trang web sẽ xác thực và trả về JWT cho phía client, phía client lưu trữ token này để thực hiện các yêu cầu sau đó.

== Giao diện
=== Đăng nhập, đăng ký
#figure(
   caption: [Giao diện khi đăng nhập],
   image("ui-signin.png")
)
#figure(
   caption: [Giao diện khi đăng ký],
   image("ui-signup.png")
)

=== Trang chủ
Khi người dùng đăng nhập thành công vào hệ thống, mới có thể xem được các chủ đề hiện có, và số chủ đề đã hoàn thành / chưa hoàn thành.
#figure(
   caption: [Trang chủ],
   image("ui-homepage.png")
)
Tại trang chủ, người dùng có thể tìm kiếm chủ đề dựa trên tên của chủ đề đó.
#figure(
   caption: [Tìm kiếm chủ đề],
   image("ui-homepage-search.png")
)

=== Bài đăng
Khi người dùng chọn vào chủ đề bất kỳ, hệ thống sẽ hiển thị các bài đăng của chủ đề đó, theo thứ tự.
#figure(
   caption: [Mỗi bài đăng được Admin tạo bằng html editor],
   image("ui-postpage.png")
)

Ở mỗi bài đăng, hệ thống yêu cầu người dùng phải trả lời câu hỏi cho bài đăng đó, bằng cách nhấn vào button ở cuối trang.
#figure(
   caption: [Dialog hiển thị các câu hỏi dưới dạng trắc nghiệm],
   image("ui-question.png")
)

=== Admin Panel
Với người dùng là tài khoản admin, sẽ có một trang riêng biệt để có thể xem các thông tin của người dùng, các bài đăng, chủ đề hiện có, từ đó có thể thực hiện các thao tác như thêm, xóa, sửa.
\
*Users*

Admin có thể xem các thông tin cơ bản của tất cả các người dùng đang có trong hệ thống, xem loại tài khoản, trạng thái (*đã được kích hoạt hay chưa*), từ đó có thể kích hoạt tài khoản hoặc hủy kích hoạt.
#figure(
   caption: [Quản lý người dùng],
   image("ui-admin-user.png")
)

*Chủ đề*

Admin có thể xem các chủ đề hiện có, hoặc tạo thêm chủ đề mới.
#figure(
   caption: [Xem thông tin các chủ đề hiện có],
   image("ui-admin-topic.png")
)

#figure(
   caption: [Tạo chủ đề mới],
   image("ui-admin-create-topic.png")
)

*Bài đăng*

Admin có thể xem thông tin của các bài đăng hiện có của một chủ đề cụ thể, hoặc tạo thêm / chỉnh sửa bài đăng cho chủ đề đó.

#figure(
   caption: [Xem thông tin bài đăng của một chủ đề],
   image("ui-admin-post.png")
)

#figure(
   caption: [Tạo bài đăng cho một chủ đề],
   image("ui-admin-create-post.png")
)


#figure(
   caption: [Chỉnh sửa bài đăng],
   image("ui-admin-edit-post.png")
)

*Câu hỏi*

Tại đây, admin có thể quản lý thông tin về câu hỏi của một bài đăng, có thể tạo/xóa câu hỏi.

#figure(
   caption: [Xem thông tin câu hỏi],
   image("ui-admin-question.png")
)

#figure(
   caption: [Tạo câu hỏi mới],
   image("ui-admin-create-question.png")
)

hashaha