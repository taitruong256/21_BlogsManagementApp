$(document).ready(function () {
  // Xử lý sự kiện khi người dùng click vào logo
  $("#logo").click(function () {
    // Chuyển hướng người dùng đến trang chủ
    window.location.href = "/home"; // Thay đổi URL cho phù hợp với đường dẫn của trang chủ ("/home")
});

  // URL API bạn muốn tải
  // const apiUrl = "https://your-api-url.com";
  // const apiUrl = "/home/data-json/";
  const apiUrl = "http://127.0.0.1:8000/api/blog/list/";
  const blogsPerPage = 6;
  let currentPage = 1;
  let totalPages = 1;
  let allBlogs = [];

  // Gửi yêu cầu GET đến API
  $.get(apiUrl, function (data) {
  // Xử lý dữ liệu sau khi nhận được
  console.log(data);

  //sắp xếp không quan tâm category, ở chỗ này đầu tiên thêm tất cả những blog thành list dài sau đó đi sắp xếp
  // Concatenate all blog posts into a single array
  var allBlogs = [];
  for (var i = 0; i < data.length; i++) {
    allBlogs = allBlogs.concat(data[i].list_blog);
  }

  // Sort the blogs by rank in descending order
  allBlogs.sort(function (a, b) {
    return parseFloat(b.rank) - parseFloat(a.rank);
  });

  //Sắp xếp theo rank, ở chỗ này sắp xếp data gốc theo category
  data.forEach(function (category) {
    category.list_blog.sort(function (a, b) {
      return parseFloat(b.rank) - parseFloat(a.rank);
    });
  });


  //hiển thị tất cả những blog đã sắp xếp
  var listBlogHtml = `<div class= "row content-div " >`;
  // Function to load blogs and handle pagination
  function loadBlogs() {
    $.get(apiUrl, function (data) {
        allBlogs = [];
        for (var i = 0; i < data.length; i++) {
            allBlogs = allBlogs.concat(data[i].list_blog);
        }

        allBlogs.sort(function (a, b) {
            return parseFloat(b.rank) - parseFloat(a.rank);
        });

        totalPages = Math.ceil(allBlogs.length / blogsPerPage);
        displayBlogs(currentPage);
        $("#totalPages").text(totalPages);
    });
}

    // Function to display blogs for the current page
    function displayBlogs(page) {
        $("#content-area").empty();
        let start = (page - 1) * blogsPerPage;
        let end = start + blogsPerPage;
        let blogsToDisplay = allBlogs.slice(start, end);

        let listBlogHtml = `<div class="row content-div">`;
        $.each(blogsToDisplay, function (index, title) {
            const nonBreakingSpace = String.fromCharCode(160);
            var shortTitle = title.title.substring(0, 50);
            while (shortTitle.length < 50) {
                shortTitle += nonBreakingSpace;
            }
            var shortContent = title.content.substring(0, 100);
            while (shortContent.length < 100) {
                shortContent += nonBreakingSpace;
            }

            listBlogHtml += `<div class="card col-4 blog-item" data-user-id="${title.user_id}" data-blog-id="${title.blog_id}" style="width: 18rem; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5); cursor: pointer;">
                <img src="${title.img}" class="card-img-top" style="object-fit: cover; height: 200px;">
                <div class="card-body">
                    <p><h5>${shortTitle}</h5></p>
                    <p><b>Author: </b>${title.author}<br>
                    <b>Content: </b>${shortContent}</p>
                    <p><b>Rank: ${title.rank}</b></p>
                </div>
            </div>`;
        });
        $("#content-area").append(listBlogHtml + `</div>`);

        $(".blog-item").click(function () {
            var blogId = $(this).data("blog-id");
            var userId = $(this).data("user-id");
            window.location.href = `/home/blog-detail/${userId}/${blogId}/`;
        });

        $("#currentPage").text(currentPage);
    }

    // Event listeners for pagination buttons
    $("#nextPage").click(function () {
        if (currentPage < totalPages) {
            currentPage++;
            displayBlogs(currentPage);
        }
    });

    $("#prevPage").click(function () {
        if (currentPage > 1) {
            currentPage--;
            displayBlogs(currentPage);
        }
    });

    // Initial load
    loadBlogs();


  // Sự kiện click vào blog để chuyển hướng đến trang chi tiết
  $(".blog-item").click(function () {
    var blogId = $(this).data("blog-id");
    var userId = $(this).data("user-id");
    window.location.href = `/home/blog-detail/${userId}/${blogId}/`;
  });
  //cmt kết thúc

  // cmt bắt đầu
  //hiển thị tất cả top 3 blog rank cao nhất
  var top3Blogs = allBlogs.slice(0, 5);

  // Clear existing content in the top-div container (optional)
  $("#top-div").empty();

  // Top 3 bài việt có rank cao nhất
  var listBlogTopHtml = `<h3><br>Top Posts</h3>`;
  for (var i = 0; i < top3Blogs.length; i++) {
    var rank = i + 1; // Adjust for 1-based ranking
    listBlogTopHtml += `
      <p class="top-blog-link" data-user-id="${top3Blogs[i].user_id}" data-blog-id="${top3Blogs[i].blog_id}"><b>Top ${rank}:</b> ${top3Blogs[i].title}</p>
        `;
  }

  // Append the HTML content to the top-div container
  $("#top-div").append(listBlogTopHtml);

  // Sự kiện click vào thẻ <a> trong danh sách Top Posts
  $(".top-blog-link").click(function () {
    var blogId = $(this).data("blog-id");
    var userId = $(this).data("user-id");
    window.location.href = `/home/blog-detail/${userId}/${blogId}/`;
  });
  //cmt kết thúc

  //cmt bắt đầu
  //hiển thị tất cả category để tý click
  $.each(data, function (index, theLoai) {
    $("#list-group").append(
      `<a href="#" class="list-group-item list-group-item-action active" >${theLoai.category}</a><div style="padding-top:5px"></div>`
    );
  });
  //cmt kết thúc

  //hiển thị click thể loại
  $(".list-group-item").click(function () {
    // Xóa lớp "active" khỏi tất cả các mục
    $(".list-group-item").removeClass("active");

    // Thêm lớp "active" vào mục được nhấp chuột
    $(this).addClass("active");
    // Cập nhật vùng nội dung dựa trên văn bản của mục được nhấp (tùy chọn)
    var tieude = $(this).text();
    $.each(data, function (index, theLoai) {
      console.log(tieude, theLoai.category);
      if (tieude == theLoai.category) {
        var theLoaiHtml = `<h2 style="padding-top: 10px;">${theLoai.category}</h2>`;
        var listBlogHtml = `<div class= "row content-div" >`;
        $.each(theLoai.list_blog, function (index, title) {
          const nonBreakingSpace = String.fromCharCode(160); // Non-breaking space character
          // Cắt tiêu đề tối đa 50 ký tự
          var shortTitle = title.title.substring(0, 50);
          while (shortTitle.length < 50) {
            shortTitle += nonBreakingSpace; // Thêm khoảng trắng cho đến khi đủ 50 ký tự
          }
          
          // Cắt nội dung mô tả tối đa 100 ký tự
          var shortContent = title.content.substring(0, 100);
          while (shortContent.length < 100) {
            shortContent += nonBreakingSpace; // Thêm khoảng trắng cho đến khi đủ 100 ký tự
          }



          listBlogHtml += `<div class="card col-4 blog-item" data-user-id="${title.user_id}" data-blog-id="${title.blog_id}" style="width: 18rem; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5); cursor: pointer;">
                <img src="${
                  title.img
                }" class="card-img-top" style="object-fit: cover; height: 200px;">
                <div class="card-body">
                  <p><h5>${shortTitle}</h5></p>
                  <p><b>Author: </b>${title.author}<br>
                  <b>Content: </b>${shortContent}...</p>
                  <p><b>Rank: ${title.rank}</b></p>
                </div>
              </div>`;
        });
        $("#content-area").html(theLoaiHtml + listBlogHtml + `</div>`);
        $(".blog-item").click(function () {
          var blogId = $(this).data("blog-id");
          var userId = $(this).data("user-id");
          window.location.href = `/home/blog-detail/${userId}/${blogId}/`;
        });
      }
    });
  });


  //tìm kiếm
  function search() {
    // Get the search term from the input field
    var wordToSearch = $("#wordToSearch").val().trim(); // Trim leading/trailing whitespaces

    // If no search term is entered, show an alert or handle it as needed
    if (!wordToSearch) {
      alert("Please enter a search term!");
      return;
    }

    // Replace the placeholder API call with your actual logic to search data
    // This example assumes you have data in a variable called `data`
    // (modify this part to integrate with your actual data source)

    var searchResult = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].list_blog.length; j++) {
        var blogPost = data[i].list_blog[j];
        if (blogPost.title.toLowerCase().includes(wordToSearch.toLowerCase())) {
          searchResult.push(blogPost);
        }
      }
    }

    // Handle the search result (modify this part to display results as needed)
    if (searchResult) {
      var listBlogHtml = `<div class= "row content-div" >`;
      $.each(searchResult, function (index, title) {
        const nonBreakingSpace = String.fromCharCode(160); // Non-breaking space character
        // Cắt tiêu đề tối đa 50 ký tự
        var shortTitle = title.title.substring(0, 50);
        while (shortTitle.length < 50) {
          shortTitle += nonBreakingSpace; // Thêm khoảng trắng cho đến khi đủ 50 ký tự
        }
        
        // Cắt nội dung mô tả tối đa 100 ký tự
        var shortContent = title.content.substring(0, 100);
        while (shortContent.length < 100) {
          shortContent += nonBreakingSpace; // Thêm khoảng trắng cho đến khi đủ 100 ký tự
        }

        listBlogHtml += `<div class="card col-4 blog-item" data-user-id="${title.user_id}" data-blog-id="${title.blog_id}" style="width: 18rem; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5); cursor: pointer;">
        <img src="${
          title.img
        }" class="card-img-top" style="object-fit: cover; height: 200px;">
          <div class="card-body">
            <p><h5>${shortTitle}</h5></p>
            <p><b>Author: </b>${title.author}<br>
            <b>Content: </b>${shortContent}...</p>
            <p><b>Rank: ${title.rank}</b></p>
          </div>
        </div>`;
      });

      $("#content-area").html(listBlogHtml + `</div>`); // Use .html() to replace existing content
    } else {
      $("#content-area").html("No search results found.");
    }
    $(".blog-item").click(function () {
      var blogId = $(this).data("blog-id");
      var userId = $(this).data("user-id");
      window.location.href = `/home/blog-detail/${userId}/${blogId}/`;
    });
  }

  // Event listener for button click
  $("#button-addon2").click(search);

  // Event listener for Enter key press in the input field
  $("#wordToSearch").keypress(function (event) {
    if (event.keyCode === 13) {
      // Enter key code
      search();
    }
  });
});
});
