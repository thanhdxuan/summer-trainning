= Giới thiệu đề tài
Trong hoạt động của mọi tổ chức, doanh nghiệp đều đặt ra các quy định, luật lệ để có doanh nghiệp có thể vận hành một cách có tổ chức, chuyên nghiệp. Ngoài ra, trong từng lĩnh vực, chuyên môn khác nhau đều có nhu cầu huấn luyện nhân sự của họ để nâng cao hiệu suất làm việc, kinh doanh. Vì vậy, đòi hỏi phải xây dựng một hệ thống để giúp cho các tổ chức này phổ biến quy định một cách nhanh chóng hơn hoặc giúp kiểm tra kiến thức của nhân viên theo giai đoạn. Ở đây, chúng ta sẽ xây dựng một website dùng để huấn luyện (training) nhân sự của một doanh nghiệp.
== Phân tích yêu cầu
=== Yêu cầu chức năng
   - Admin có thể tạo bài đăng (post) theo các chủ đề (topic), mỗi chủ đề gồm nhiều bài đăng (post) có thứ tự hiển thị.
   - Mỗi bài đăng có các câu hỏi(question) liên quan để người học trả lời câu hỏi dạng multiple choice question.
   - Mỗi chủ đề có các thông tin: ảnh đại diện, tên chủ đề, từ khoá chủ đề, độ khó, và thông tin dẫn xuất số bài đăng của chủ đề đó.
   - Mỗi bài đăng có các nội dung như tiêu đề lớn, mô tả ngắn, nội dung bài đăng (nhập html editor), ảnh  banner bài đăng, thời gian tạo, thời gian chỉnh sửa, từ khoá liên quan, link short_url (slug), số phút đọc ước tính, số câu hỏi sinh ngẫu nhiên (từ danh sách câu hỏi liên quan bài đăng đã tạo).
   - Người dùng là nhân viên công ty, có thể đăng kí tài khoản, nhưng được sử dụng trang web chỉ khi được admin approve tài khoản. Có các chức năng khác như quên mật khẩu, đổi mật khẩu (gửi qua email xác nhận)
   - User khi vào trang web sẽ thấy danh sách các chủ đề, khi vào 1 chủ đề sẽ xem được danh mục các bài đăng với thứ tự hiển thị như admin đã thiết lập. Khi xem 1 bài đăng, user có thể có các chức năng Next (đi tới bài đăng tiếp) Previous (bài đăng trước). Nếu là bài đăng đầu tiên hay cuối cùng thì các nút tương ứng sẽ bị mờ.
   - Khi di chuyển qua bài đăng kế tiếp thì user phải trả lời đúng hết các câu hỏi của bài đăng hiện tại. Nếu các câu hỏi của bài đăng hiện tại đã trả lời cho lần xem trước đó thì không cần phải trả lời lại. Khi hiển thị câu hỏi, hệ thống kiểm tra số câu hỏi cho bài đăng đó là bao nhiêu, và lấy ra ngẫu nhiên số câu hỏi từ danh sách câu hỏi của bài đăng để cho người dùng trả lời.
   - Hệ thống ghi nhận và hiển thị bài đăng nào user đã hoàn thành (nghĩa là đã trả lời hết câu hỏi), chưa hoàn thành (nghĩa là câu hỏi trả lời chưa đúng hoặc chưa trả lời câu hỏi nào).Người dùng có thể xem lại câu hỏi và kết quả trả lời của mình ở mỗi bài đăng.
   - Khi xem danh sách các chủ đề ở trang chủ, user sẽ thấy các thông tin ảnh đại diện của chủ đề, độ khó chủ đề, tổng số lượng bài đăng trong chủ đề, số bài đăng đã hoàn thành. Có thể tìm kiếm chủ đề dựa vào tên chủ đề, lọc theo độ khó, và chưa hoàn thành/ hoàn thành.

#pagebreak()