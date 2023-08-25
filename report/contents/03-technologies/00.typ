= Công nghệ sử dụng
== Phía client (Front - end)
*ReactJS*

ReactJS là một thư viện JavaScript phổ biến được sử dụng để xây dựng giao diện người dùng động và tương tác trên các ứng dụng web. Với ReactJS, chúng ta có thể tạo ra các thành phần UI đơn giản hoặc phức tạp, và sau đó kết hợp chúng lại để tạo thành các ứng dụng phong phú.\
#figure(
   caption: [ReactJS là một thư viện JavaScript phổ biến hiện nay.],
   image("React-icon.png", width: 40%)
)
Một số ưu điểm của ReactJS bao gồm:
- *Component-based*: ReactJS sử dụng cấu trúc dựa trên thành phần, cho phép chúng ta tái sử dụng các thành phần UI và xây dựng giao diện phức tạp bằng cách kết hợp các thành phần nhỏ hơn. Điều này giúp cải thiện tính module, rõ ràng và dễ bảo trì của mã nguồn.
- *Virtual DOM*: ReactJS sử dụng một DOM ảo để quản lý và cập nhật giao diện người dùng. Khi có sự thay đổi trong dữ liệu, ReactJS so sánh DOM ảo và DOM thực tế, và chỉ cập nhật những phần thay đổi thực sự. Điều này giúp tăng hiệu suất ứng dụng và giảm tải cho trình duyệt.
- *High Performance*: Nhờ cơ chế cập nhật thông minh và sử dụng DOM ảo, ReactJS có khả năng xử lý hiệu quả các ứng dụng có giao diện phức tạp và dữ liệu động. Ngoài ra, ReactJS cũng cung cấp các công cụ tối ưu hóa như React.memo, PureComponent để giảm thiểu việc cập nhật không cần thiết và tăng tốc độ render.
- *Hỗ trợ cho cả client-side và server-side*: ReactJS cho phép chúng ta xây dựng ứng dụng đơn trang (single-page applications) trên client-side, nhưng cũng hỗ trợ server-side rendering (SSR). SSR giúp tăng tốc độ tải trang ban đầu và cải thiện trải nghiệm người dùng.
- *Hệ sinh thái mạnh mẽ*: ReactJS có một hệ sinh thái phát triển đa dạng và phong phú, với nhiều thư viện và công cụ hỗ trợ như React Router, Redux, MobX, Styled Components, và nhiều hơn nữa. Điều này giúp chúng ta xây dựng ứng dụng theo cách tốt nhất và lựa chọn các công nghệ phù hợp với dự án của mình.

Sau khi tìm hiểu  ưu, nhược điểm của ReactJS, sinh viên quyết định sử dụng thư viện này làm công nghệ chính để phát triển trang web ở phía client (front - end).

*Material UI (MUI)* @web-mui

Để thiết kế giao diện sử dụng ReactJS, sinh viên quyết định sử dụng thư viện Marterial-UI của ReactJS, để nâng cao trải nghiệm người dùng, tối ưu hóa những ưu điểm của ReactJS.

Material-UI là một thư viện giao diện người dùng cho ReactJS, được xây dựng dựa trên nguyên tắc thiết kế của Google Material Design. Nó cung cấp các thành phần UI và các phong cách mô phỏng hầu hết các yếu tố giao diện người dùng của Material Design, giúp chúng ta xây dựng ứng dụng web với giao diện hấp dẫn và chuyên nghiệp.
#figure(
   caption: [MUI là một thư viện của ReactJS cung cấp giao diện hiện đại.],
   image("mui-logo.png", width: 40%)
)
Một số ưu điểm của Material-UI bao gồm:
- *Thiết kế theo nguyên tắc Material Design*: Với Material-UI, chúng ta có thể sử dụng các thành phần UI đã được thiết kế sẵn theo nguyên tắc của Google Material Design, bao gồm nút, thanh điều hướng, biểu mẫu, bảng dữ liệu và nhiều hơn nữa. Điều này giúp tạo ra giao diện người dùng đẹp mắt, mượt mà và dễ sử dụng
- *Tùy chỉnh và tái sử dụng dễ dàng*: Material-UI cho phép chúng ta tùy chỉnh các thành phần UI để phù hợp với nhu cầu thiết kế của chúng ta. chúng ta có thể thay đổi màu sắc, kích thước, kiểu dáng và các thuộc tính khác của các thành phần. Ngoài ra, Material-UI cung cấp các thành phần tái sử dụng, giúp chúng ta tiết kiệm thời gian và công sức trong việc xây dựng giao diện người dùng.
- *Hỗ trợ tương thích đa trình duyệt*: Material-UI được thiết kế để tương thích với nhiều trình duyệt khác nhau, bao gồm cả trình duyệt di động. Điều này giúp đảm bảo rằng ứng dụng của chúng ta sẽ hoạt động một cách nhất quán trên các nền tảng khác nhau mà không cần quá nhiều công việc tùy chỉnh.
- *Hệ sinh thái mạnh mẽ*: Material-UI có một hệ sinh thái đa dạng và phong phú, bao gồm nhiều thành phần, mẫu thiết kế, tiện ích và các công cụ hỗ trợ. Chúng ta có thể tìm thấy sẵn một loạt các thành phần và giải pháp để giúp chúng ta xây dựng giao diện người dùng chất lượng cao một cách nhanh chóng và dễ dàng.
== Phía server (Back - end)
*PostgreSQL*

PostgreSQL là một hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở và mạnh mẽ. Nó được phát triển với sự chú trọng vào tính đồng nhất, bảo mật và khả năng mở rộng. PostgreSQL hỗ trợ các tính năng SQL tiên tiến, cung cấp một môi trường đáng tin cậy để lưu trữ và quản lý dữ liệu.
#figure(
   caption: [PostgreSQL là một hệ quản trị cơ sở dữ liệu ổn định, mạnh mẽ và linh hoạt.],
   image("postgresql.png", width: 40%)
)
Một số ưu điểm của PostgreSQL bao gồm:

- *Độ tin cậy cao*: PostgreSQL được xây dựng với sự chú trọng đến tính đồng nhất và bảo mật. Nó sử dụng các cơ chế ghi nhật ký (write-ahead logging) để đảm bảo dữ liệu được bảo vệ và không mất mát trong trường hợp xảy ra sự cố. PostgreSQL cũng hỗ trợ các công nghệ như sao lưu, phục hồi và replica để đảm bảo tính sẵn sàng cao và khả năng khôi phục sau sự cố.

- *Hỗ trợ đa nền tảng*: PostgreSQL có thể chạy trên nhiều nền tảng, bao gồm Linux, Windows và macOS. Điều này cho phép bạn triển khai và vận hành PostgreSQL trên các hệ thống khác nhau một cách linh hoạt.

- *Tính mở rộng*: PostgreSQL có khả năng mở rộng tốt, cho phép bạn mở rộng cấu trúc cơ sở dữ liệu theo nhu cầu của ứng dụng. Bạn có thể tăng cường hiệu suất và khả năng chịu tải của PostgreSQL bằng cách sử dụng các công nghệ như phân vùng, chỉ mục và replica.

- *Tính linh hoạt và mạnh mẽ*: PostgreSQL cung cấp một loạt các tính năng tiên tiến và mạnh mẽ, bao gồm hỗ trợ truy vấn phức tạp, khóa dữ liệu đa mức, xử lý giao dịch an toàn và hỗ trợ các kiểu dữ liệu đa dạng. Nó cũng hỗ trợ các ngôn ngữ lập trình phổ biến như Python, Java, C/C++, và nhiều ngôn ngữ khác.

- *Cộng đồng phát triển đông đảo*: PostgreSQL có một cộng đồng phát triển rộng lớn, với nhiều nguồn tài nguyên, tài liệu và hỗ trợ từ cộng đồng. Việc có một cộng đồng phát triển mạnh mẽ giúp đảm bảo rằng PostgreSQL được cải thiện và bảo trì một cách liên tục.

PostgreSQL là một hệ quản trị cơ sở dữ liệu ổn định, mạnh mẽ và linh hoạt. Với tính tin cậy cao, tính mở rộng, và nhiều tính năng tiên tiến, PostgreSQL là một lựa chọn phổ biến cho việc lưu trữ và quản lý dữ liệu trong các ứng dụng phức tạp. Vì vậy, ở sinh viên sử dụng PostgreSQL để lưu trữ và quản lý cơ sở dữ liệu của trang web này.

*Flask*

Ở trong dự án này, chúng ta sử dụng Flask để xử lý logic ở phía server.

Flask là một framework micro web phát triển bằng Python, nhẹ nhàng và dễ sử dụng. Với Flask, bạn có thể nhanh chóng xây dựng các ứng dụng web nhỏ đến trung bình mà không cần một số lượng lớn các thành phần và tính năng phức tạp. Flask tập trung vào sự đơn giản, linh hoạt và dễ mở rộng, làm cho việc phát triển ứng dụng web trở nên dễ dàng và nhanh chóng.
#figure(
   caption: [Flask là một thư viện Python giúp phát triển web một cách đơn giản, nhanh chóng],
   image("flask.png", width: 40%)
)
\
\
Một số ưu điểm của Flask bao gồm:
- *Đơn giản và dễ sử dụng*: Flask có cấu trúc đơn giản và ít đặt quy tắc, giúp người dùng nắm bắt nhanh chóng và phát triển ứng dụng một cách dễ dàng. Nó không có các yêu cầu phức tạp và cho phép bạn tùy chỉnh theo nhu cầu cụ thể của dự án.

- *Framework micro*: Flask được thiết kế như một framework micro, điều này có nghĩa là nó chỉ cung cấp các thành phần cơ bản cần thiết để xây dựng ứng dụng web. Tuy nhiên, Flask cũng cho phép bạn mở rộng chức năng bằng cách sử dụng các tiện ích và các extension của cộng đồng.

- *Linh hoạt và tùy chỉnh*: Flask cho phép bạn tùy chỉnh và linh hoạt trong việc xây dựng ứng dụng web. Bạn có thể lựa chọn các thành phần cần thiết cho dự án của mình và sử dụng các extension để bổ sung các tính năng như xác thực, cơ sở dữ liệu, giao diện người dùng, và nhiều hơn nữa.

- *Hỗ trợ tốt cho Python*: Flask được xây dựng bằng Python và tương thích tốt với các thư viện và công cụ của Python. Điều này cho phép bạn sử dụng các thư viện Python phổ biến để xử lý các tác vụ phức tạp và tích hợp dễ dàng với hệ thống tồn tại.

- *Cộng đồng phát triển đông đảo*: Flask có một cộng đồng phát triển lớn, với nhiều nguồn tài nguyên, ví dụ như tài liệu, các ví dụ mã nguồn và các extension được xây dựng bởi cộng đồng. Điều này giúp bạn tìm kiếm giải pháp, hỗ trợ và nâng cao kỹ năng phát triển của mình.

Flask là một lựa chọn tuyệt vời cho việc phát triển ứng dụng web đơn giản và linh hoạt. Với tính đơn giản, dễ sử dụng và khả năng tùy chỉnh, Flask giúp bạn xây dựng ứng dụng web nhanh chóng và dễ dàng.
== Khác
Ngoài những công nghệ chính trên, sinh viên còn sử dụng các công cụ hỗ trợ khác trong quá trình phát triển trang web để nâng cao hiệu suất như:
- Postman: Test API phía back-end.
- Google DevTools: Test phía front-end.
- Toggle Pesticide: Kiểm tra cấu trúc của giao diện người dùng.
...
#pagebreak()