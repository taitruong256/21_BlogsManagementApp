$(document).ready(function () {
  // URL API bạn muốn tải
  // const apiUrl = "https://your-api-url.com";
  const apiUrl = "/home/data-json/";
  // const apiUrl = "http://127.0.0.1:8000/api/blogs/";

  // Gửi yêu cầu GET đến API
  // $.get(apiUrl, function (data) {
  data = [
    {
      category: "Blogging",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "5 Tips for Writing a Captivating Blog Post",
          author: "John Doe",
          content: "Crafting blog posts that engage and inform your audience",
          rank: "4.5",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "SEO Strategies for Bloggers: Boosting Visibility",
          author: "Jane Doe",
          content:
            "Mastering search engine optimization to drive traffic to your blog",
          rank: "4.8",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Content Marketing for Bloggers: Attracting and Retaining Readers",
          author: "Alice",
          content:
            "Developing a content strategy that attracts and retains loyal readers",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Monetizing Your Blog: Turning Your Passion into Profit",
          author: "Bob",
          content:
            "Exploring various monetization methods to generate income from your blog",
          rank: "4.6",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Building a Community Around Your Blog: Fostering Engagement",
          author: "Charlie",
          content:
            "Strategies for creating a thriving community of engaged readers",
          rank: "4.9",
        },
      ],
    },
    {
      category: "Programming",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Python Programming for Beginners: Getting Started",
          author: "Alice",
          content:
            "A comprehensive guide to learning the basics of Python programming",
          rank: "4.2",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Data Structures and Algorithms in Python",
          author: "Bob",
          content:
            "Understanding essential data structures and algorithms in Python",
          rank: "4.9",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Web Development with JavaScript: Building Interactive Websites",
          author: "Charlie",
          content:
            "Learning JavaScript to create dynamic and engaging web pages",
          rank: "4.4",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Object-Oriented Programming (OOP) in Python",
          author: "David",
          content:
            "Mastering OOP concepts to design and develop maintainable Python projects",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Introduction to Machine Learning with Python",
          author: "Emily",
          content:
            "Exploring the fundamentals of machine learning using Python libraries",
          rank: "4.8",
        },
      ],
    },
    {
      category: "Marketing",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Python Programming for Beginners: Getting Started",
          author: "Alice",
          content:
            "A comprehensive guide to learning the basics of Python programming",
          rank: "4.2",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Data Structures and Algorithms in Python",
          author: "Bob",
          content:
            "Understanding essential data structures and algorithms in Python",
          rank: "4.9",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Web Development with JavaScript: Building Interactive Websites",
          author: "Charlie",
          content:
            "Learning JavaScript to create dynamic and engaging web pages",
          rank: "4.4",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Object-Oriented Programming (OOP) in Python",
          author: "David",
          content:
            "Mastering OOP concepts to design and develop maintainable Python projects",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Introduction to Machine Learning with Python",
          author: "Emily",
          content:
            "Exploring the fundamentals of machine learning using Python libraries",
          rank: "4.8",
        },
      ],
    },
    {
      category: "Blogging",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "5 Tips for Writing a Captivating Blog Post",
          author: "John Doe",
          content: "Crafting blog posts that engage and inform your audience",
          rank: "4.5",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "SEO Strategies for Bloggers: Boosting Visibility",
          author: "Jane Doe",
          content:
            "Mastering search engine optimization to drive traffic to your blog",
          rank: "4.8",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Content Marketing for Bloggers: Attracting and Retaining Readers",
          author: "Alice",
          content:
            "Developing a content strategy that attracts and retains loyal readers",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Monetizing Your Blog: Turning Your Passion into Profit",
          author: "Bob",
          content:
            "Exploring various monetization methods to generate income from your blog",
          rank: "4.6",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Building a Community Around Your Blog: Fostering Engagement",
          author: "Charlie",
          content:
            "Strategies for creating a thriving community of engaged readers",
          rank: "4.9",
        },
      ],
    },
    {
      category: "Programming",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Python Programming for Beginners: Getting Started",
          author: "Alice",
          content:
            "A comprehensive guide to learning the basics of Python programming",
          rank: "4.2",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Data Structures and Algorithms in Python",
          author: "Bob",
          content:
            "Understanding essential data structures and algorithms in Python",
          rank: "4.9",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Web Development with JavaScript: Building Interactive Websites",
          author: "Charlie",
          content:
            "Learning JavaScript to create dynamic and engaging web pages",
          rank: "4.4",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Object-Oriented Programming (OOP) in Python",
          author: "David",
          content:
            "Mastering OOP concepts to design and develop maintainable Python projects",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Introduction to Machine Learning with Python",
          author: "Emily",
          content:
            "Exploring the fundamentals of machine learning using Python libraries",
          rank: "4.8",
        },
      ],
    },
    {
      category: "Marketing",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Python Programming for Beginners: Getting Started",
          author: "Alice",
          content:
            "A comprehensive guide to learning the basics of Python programming",
          rank: "4.2",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Data Structures and Algorithms in Python",
          author: "Bob",
          content:
            "Understanding essential data structures and algorithms in Python",
          rank: "4.9",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Web Development with JavaScript: Building Interactive Websites",
          author: "Charlie",
          content:
            "Learning JavaScript to create dynamic and engaging web pages",
          rank: "4.4",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Object-Oriented Programming (OOP) in Python",
          author: "David",
          content:
            "Mastering OOP concepts to design and develop maintainable Python projects",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Introduction to Machine Learning with Python",
          author: "Emily",
          content:
            "Exploring the fundamentals of machine learning using Python libraries",
          rank: "4.8",
        },
      ],
    },
    {
      category: "Blogging",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "5 Tips for Writing a Captivating Blog Post",
          author: "John Doe",
          content: "Crafting blog posts that engage and inform your audience",
          rank: "4.5",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "SEO Strategies for Bloggers: Boosting Visibility",
          author: "Jane Doe",
          content:
            "Mastering search engine optimization to drive traffic to your blog",
          rank: "4.8",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Content Marketing for Bloggers: Attracting and Retaining Readers",
          author: "Alice",
          content:
            "Developing a content strategy that attracts and retains loyal readers",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Monetizing Your Blog: Turning Your Passion into Profit",
          author: "Bob",
          content:
            "Exploring various monetization methods to generate income from your blog",
          rank: "4.6",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Building a Community Around Your Blog: Fostering Engagement",
          author: "Charlie",
          content:
            "Strategies for creating a thriving community of engaged readers",
          rank: "4.9",
        },
      ],
    },
    {
      category: "Programming",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Python Programming for Beginners: Getting Started",
          author: "Alice",
          content:
            "A comprehensive guide to learning the basics of Python programming",
          rank: "4.2",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Data Structures and Algorithms in Python",
          author: "Bob",
          content:
            "Understanding essential data structures and algorithms in Python",
          rank: "4.9",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Web Development with JavaScript: Building Interactive Websites",
          author: "Charlie",
          content:
            "Learning JavaScript to create dynamic and engaging web pages",
          rank: "4.4",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Object-Oriented Programming (OOP) in Python",
          author: "David",
          content:
            "Mastering OOP concepts to design and develop maintainable Python projects",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Introduction to Machine Learning with Python",
          author: "Emily",
          content:
            "Exploring the fundamentals of machine learning using Python libraries",
          rank: "4.8",
        },
      ],
    },
    {
      category: "Marketing",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Python Programming for Beginners: Getting Started",
          author: "Alice",
          content:
            "A comprehensive guide to learning the basics of Python programming",
          rank: "4.2",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Data Structures and Algorithms in Python",
          author: "Bob",
          content:
            "Understanding essential data structures and algorithms in Python",
          rank: "4.9",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Web Development with JavaScript: Building Interactive Websites",
          author: "Charlie",
          content:
            "Learning JavaScript to create dynamic and engaging web pages",
          rank: "4.4",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Object-Oriented Programming (OOP) in Python",
          author: "David",
          content:
            "Mastering OOP concepts to design and develop maintainable Python projects",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Introduction to Machine Learning with Python",
          author: "Emily",
          content:
            "Exploring the fundamentals of machine learning using Python libraries",
          rank: "4.8",
        },
      ],
    },
    {
      category: "Blogging",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "5 Tips for Writing a Captivating Blog Post",
          author: "John Doe",
          content: "Crafting blog posts that engage and inform your audience",
          rank: "4.5",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "SEO Strategies for Bloggers: Boosting Visibility",
          author: "Jane Doe",
          content:
            "Mastering search engine optimization to drive traffic to your blog",
          rank: "4.8",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Content Marketing for Bloggers: Attracting and Retaining Readers",
          author: "Alice",
          content:
            "Developing a content strategy that attracts and retains loyal readers",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Monetizing Your Blog: Turning Your Passion into Profit",
          author: "Bob",
          content:
            "Exploring various monetization methods to generate income from your blog",
          rank: "4.6",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Building a Community Around Your Blog: Fostering Engagement",
          author: "Charlie",
          content:
            "Strategies for creating a thriving community of engaged readers",
          rank: "4.9",
        },
      ],
    },
    {
      category: "Programming",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Python Programming for Beginners: Getting Started",
          author: "Alice",
          content:
            "A comprehensive guide to learning the basics of Python programming",
          rank: "4.2",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Data Structures and Algorithms in Python",
          author: "Bob",
          content:
            "Understanding essential data structures and algorithms in Python",
          rank: "4.9",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Web Development with JavaScript: Building Interactive Websites",
          author: "Charlie",
          content:
            "Learning JavaScript to create dynamic and engaging web pages",
          rank: "4.4",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Object-Oriented Programming (OOP) in Python",
          author: "David",
          content:
            "Mastering OOP concepts to design and develop maintainable Python projects",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Introduction to Machine Learning with Python",
          author: "Emily",
          content:
            "Exploring the fundamentals of machine learning using Python libraries",
          rank: "4.8",
        },
      ],
    },
    {
      category: "Marketing",
      list_blog: [
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Python Programming for Beginners: Getting Started",
          author: "Alice",
          content:
            "A comprehensive guide to learning the basics of Python programming",
          rank: "4.2",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Data Structures and Algorithms in Python",
          author: "Bob",
          content:
            "Understanding essential data structures and algorithms in Python",
          rank: "4.9",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title:
            "Web Development with JavaScript: Building Interactive Websites",
          author: "Charlie",
          content:
            "Learning JavaScript to create dynamic and engaging web pages",
          rank: "4.4",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Object-Oriented Programming (OOP) in Python",
          author: "David",
          content:
            "Mastering OOP concepts to design and develop maintainable Python projects",
          rank: "4.7",
        },
        {
          img: "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          title: "Introduction to Machine Learning with Python",
          author: "Emily",
          content:
            "Exploring the fundamentals of machine learning using Python libraries",
          rank: "4.8",
        },
      ],
    },
  ];
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

  // cmt bắt đầu
  //hiển thị tất cả những blog đã sắp xếp
  var listBlogHtml = `<div class= "row content-div " >`;
  $.each(allBlogs, function (index, title) {
    listBlogHtml += `<div class="card col-4 " style="width: 18rem; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);">
          <img src="${
            title.img
          }" class="card-img-top" style="object-fit: cover;">
          <div class="card-body">
            <p><h5>${title.title}</h5></p>
            <p><b>Author: </b>${title.author}<br>
            <b>Content: </b>${title.content.substring(
              0,
              Math.min(title.content.length, 100)
            )}...</p>
            <p><b>Rank: ${title.rank}</b></p>
          </div>
        </div>`;
  });
  $("#content-area").append(listBlogHtml + `</div>`);
  //cmt kết thúc

  // cmt bắt đầu
  //hiển thị tất cả top 3 blog rank cao nhất
  var top3Blogs = allBlogs.slice(0, 3);

  // Clear existing content in the top-div container (optional)
  $("#top-div").empty();

  // Top 3 bài việt có rank cao nhất
  var listBlogTopHtml = `<h3><br>Top Posts</h3>`;
  for (var i = 0; i < top3Blogs.length; i++) {
    var rank = i + 1; // Adjust for 1-based ranking
    listBlogTopHtml += `
          <a><b>Top${rank}:</b> ${top3Blogs[i].title}</a>
        `;
  }

  // Append the HTML content to the top-div container
  $("#top-div").append(listBlogTopHtml);
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
          listBlogHtml += `<div class="card col-4" style="width: 18rem; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);">
                <img src="${
                  title.img
                }" class="card-img-top"  style="object-fit: cover;">
                <div class="card-body">
                  <p><h5>${title.title}</h5></p>
                  <p><b>Author: </b>${title.author}<br>
                  <b>Content: </b>${title.content.substring(
                    0,
                    Math.min(title.content.length, 100)
                  )}...</p>
                  <p><b>Rank: ${title.rank}</b></p>
                </div>
              </div>`;
        });
        $("#content-area").html(theLoaiHtml + listBlogHtml + `</div>`);
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
        listBlogHtml += `<div class="card col-4" style="width: 18rem; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);">
          <img src="${
            title.img
          }" class="card-img-top"  style="object-fit: cover;">
          <div class="card-body">
            <p><h5>${title.title}</h5></p>
            <p><b>Author: </b>${title.author}<br>
            <b>Content: </b>${title.content.substring(
              0,
              Math.min(title.content.length, 100)
            )}...</p>
            <p><b>Rank: ${title.rank}</b></p>
          </div>
        </div>`;
      });

      $("#content-area").html(listBlogHtml + `</div>`); // Use .html() to replace existing content
    } else {
      $("#content-area").html("No search results found.");
    }
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
        listBlogHtml += `<div class="card col-4" style="width: 18rem; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);">
          <img src="${
            title.img
          }" class="card-img-top"  style="object-fit: cover;">
          <div class="card-body">
            <p><h5>${title.title}</h5></p>
            <p><b>Author: </b>${title.author}<br>
            <b>Content: </b>${title.content.substring(
              0,
              Math.min(title.content.length, 100)
            )}...</p>
            <p><b>Rank: ${title.rank}</b></p>
          </div>
        </div>`;
      });

      $("#content-area").html(listBlogHtml + `</div>`); // Use .html() to replace existing content
    } else {
      $("#content-area").html("No search results found.");
    }
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
// });
