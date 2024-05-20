from django.shortcuts import render
from django.shortcuts import redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
# Create your views here.
def get_home(request):
    user = request.user
    return render(request, 'index.html', {'user': user})


def index(request):
    if request.user.is_authenticated:
        return redirect('home')
    return redirect('login')

def add_blog(request):
    return render(request, "add_blog.html")

def get_blog_detail(request, user_id, blog_id):
      return render(request, 'blog_detail.html')

tmp = [
    {
      "category": "Blogging",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "5 Tips for Writing a Captivating Blog Post",
          "author": "John Doe",
          "content": "Crafting blog posts that engage and inform your audience",
          "rank": "4.5"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "SEO Strategies for Bloggers: Boosting Visibility",
          "author": "Jane Doe",
          "content": "Mastering search engine optimization to drive traffic to your blog",
          "rank": "4.8"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Content Marketing for Bloggers: Attracting and Retaining Readers",
          "author": "Alice",
          "content": "Developing a content strategy that attracts and retains loyal readers",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Monetizing Your Blog: Turning Your Passion into Profit",
          "author": "Bob",
          "content": "Exploring various monetization methods to generate income from your blog",
          "rank": "4.6"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Building a Community Around Your Blog: Fostering Engagement",
          "author": "Charlie",
          "content": "Strategies for creating a thriving community of engaged readers",
          "rank": "4.9"
        }
      ]
    },
    {
      "category": "Programming",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Python Programming for Beginners: Getting Started",
          "author": "Alice",
          "content": "A comprehensive guide to learning the basics of Python programming",
          "rank": "4.2"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Data Structures and Algorithms in Python",
          "author": "Bob",
          "content": "Understanding essential data structures and algorithms in Python",
          "rank": "4.9"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Web Development with JavaScript: Building Interactive Websites",
          "author": "Charlie",
          "content": "Learning JavaScript to create dynamic and engaging web pages",
          "rank": "4.4"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Object-Oriented Programming (OOP) in Python",
          "author": "David",
          "content": "Mastering OOP concepts to design and develop maintainable Python projects",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Introduction to Machine Learning with Python",
          "author": "Emily",
          "content": "Exploring the fundamentals of machine learning using Python libraries",
          "rank": "4.8"
        }
      ]
    },
    {
      "category": "Marketing",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Python Programming for Beginners: Getting Started",
          "author": "Alice",
          "content": "A comprehensive guide to learning the basics of Python programming",
          "rank": "4.2"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Data Structures and Algorithms in Python",
          "author": "Bob",
          "content": "Understanding essential data structures and algorithms in Python",
          "rank": "4.9"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Web Development with JavaScript: Building Interactive Websites",
          "author": "Charlie",
          "content": "Learning JavaScript to create dynamic and engaging web pages",
          "rank": "4.4"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Object-Oriented Programming (OOP) in Python",
          "author": "David",
          "content": "Mastering OOP concepts to design and develop maintainable Python projects",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Introduction to Machine Learning with Python",
          "author": "Emily",
          "content": "Exploring the fundamentals of machine learning using Python libraries",
          "rank": "4.8"
        }
      ]
    },
    {
      "category": "Blogging",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "5 Tips for Writing a Captivating Blog Post",
          "author": "John Doe",
          "content": "Crafting blog posts that engage and inform your audience",
          "rank": "4.5"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "SEO Strategies for Bloggers: Boosting Visibility",
          "author": "Jane Doe",
          "content": "Mastering search engine optimization to drive traffic to your blog",
          "rank": "4.8"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Content Marketing for Bloggers: Attracting and Retaining Readers",
          "author": "Alice",
          "content": "Developing a content strategy that attracts and retains loyal readers",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Monetizing Your Blog: Turning Your Passion into Profit",
          "author": "Bob",
          "content": "Exploring various monetization methods to generate income from your blog",
          "rank": "4.6"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Building a Community Around Your Blog: Fostering Engagement",
          "author": "Charlie",
          "content": "Strategies for creating a thriving community of engaged readers",
          "rank": "4.9"
        }
      ]
    },
    {
      "category": "Programming",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Python Programming for Beginners: Getting Started",
          "author": "Alice",
          "content": "A comprehensive guide to learning the basics of Python programming",
          "rank": "4.2"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Data Structures and Algorithms in Python",
          "author": "Bob",
          "content": "Understanding essential data structures and algorithms in Python",
          "rank": "4.9"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Web Development with JavaScript: Building Interactive Websites",
          "author": "Charlie",
          "content": "Learning JavaScript to create dynamic and engaging web pages",
          "rank": "4.4"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Object-Oriented Programming (OOP) in Python",
          "author": "David",
          "content": "Mastering OOP concepts to design and develop maintainable Python projects",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Introduction to Machine Learning with Python",
          "author": "Emily",
          "content": "Exploring the fundamentals of machine learning using Python libraries",
          "rank": "4.8"
        }
      ]
    },
    {
      "category": "Marketing",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Python Programming for Beginners: Getting Started",
          "author": "Alice",
          "content": "A comprehensive guide to learning the basics of Python programming",
          "rank": "4.2"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Data Structures and Algorithms in Python",
          "author": "Bob",
          "content": "Understanding essential data structures and algorithms in Python",
          "rank": "4.9"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Web Development with JavaScript: Building Interactive Websites",
          "author": "Charlie",
          "content": "Learning JavaScript to create dynamic and engaging web pages",
          "rank": "4.4"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Object-Oriented Programming (OOP) in Python",
          "author": "David",
          "content": "Mastering OOP concepts to design and develop maintainable Python projects",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Introduction to Machine Learning with Python",
          "author": "Emily",
          "content": "Exploring the fundamentals of machine learning using Python libraries",
          "rank": "4.8"
        }
      ]
    },
    {
      "category": "Blogging",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "5 Tips for Writing a Captivating Blog Post",
          "author": "John Doe",
          "content": "Crafting blog posts that engage and inform your audience",
          "rank": "4.5"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "SEO Strategies for Bloggers: Boosting Visibility",
          "author": "Jane Doe",
          "content": "Mastering search engine optimization to drive traffic to your blog",
          "rank": "4.8"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Content Marketing for Bloggers: Attracting and Retaining Readers",
          "author": "Alice",
          "content": "Developing a content strategy that attracts and retains loyal readers",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Monetizing Your Blog: Turning Your Passion into Profit",
          "author": "Bob",
          "content": "Exploring various monetization methods to generate income from your blog",
          "rank": "4.6"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Building a Community Around Your Blog: Fostering Engagement",
          "author": "Charlie",
          "content": "Strategies for creating a thriving community of engaged readers",
          "rank": "4.9"
        }
      ]
    },
    {
      "category": "Programming",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Python Programming for Beginners: Getting Started",
          "author": "Alice",
          "content": "A comprehensive guide to learning the basics of Python programming",
          "rank": "4.2"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Data Structures and Algorithms in Python",
          "author": "Bob",
          "content": "Understanding essential data structures and algorithms in Python",
          "rank": "4.9"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Web Development with JavaScript: Building Interactive Websites",
          "author": "Charlie",
          "content": "Learning JavaScript to create dynamic and engaging web pages",
          "rank": "4.4"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Object-Oriented Programming (OOP) in Python",
          "author": "David",
          "content": "Mastering OOP concepts to design and develop maintainable Python projects",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Introduction to Machine Learning with Python",
          "author": "Emily",
          "content": "Exploring the fundamentals of machine learning using Python libraries",
          "rank": "4.8"
        }
      ]
    },
    {
      "category": "Marketing",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Python Programming for Beginners: Getting Started",
          "author": "Alice",
          "content": "A comprehensive guide to learning the basics of Python programming",
          "rank": "4.2"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Data Structures and Algorithms in Python",
          "author": "Bob",
          "content": "Understanding essential data structures and algorithms in Python",
          "rank": "4.9"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Web Development with JavaScript: Building Interactive Websites",
          "author": "Charlie",
          "content": "Learning JavaScript to create dynamic and engaging web pages",
          "rank": "4.4"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Object-Oriented Programming (OOP) in Python",
          "author": "David",
          "content": "Mastering OOP concepts to design and develop maintainable Python projects",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Introduction to Machine Learning with Python",
          "author": "Emily",
          "content": "Exploring the fundamentals of machine learning using Python libraries",
          "rank": "4.8"
        }
      ]
    },
    {
      "category": "Blogging",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "5 Tips for Writing a Captivating Blog Post",
          "author": "John Doe",
          "content": "Crafting blog posts that engage and inform your audience",
          "rank": "4.5"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "SEO Strategies for Bloggers: Boosting Visibility",
          "author": "Jane Doe",
          "content": "Mastering search engine optimization to drive traffic to your blog",
          "rank": "4.8"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Content Marketing for Bloggers: Attracting and Retaining Readers",
          "author": "Alice",
          "content": "Developing a content strategy that attracts and retains loyal readers",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Monetizing Your Blog: Turning Your Passion into Profit",
          "author": "Bob",
          "content": "Exploring various monetization methods to generate income from your blog",
          "rank": "4.6"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Building a Community Around Your Blog: Fostering Engagement",
          "author": "Charlie",
          "content": "Strategies for creating a thriving community of engaged readers",
          "rank": "4.9"
        }
      ]
    },
    {
      "category": "Programming",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Python Programming for Beginners: Getting Started",
          "author": "Alice",
          "content": "A comprehensive guide to learning the basics of Python programming",
          "rank": "4.2"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Data Structures and Algorithms in Python",
          "author": "Bob",
          "content": "Understanding essential data structures and algorithms in Python",
          "rank": "4.9"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Web Development with JavaScript: Building Interactive Websites",
          "author": "Charlie",
          "content": "Learning JavaScript to create dynamic and engaging web pages",
          "rank": "4.4"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Object-Oriented Programming (OOP) in Python",
          "author": "David",
          "content": "Mastering OOP concepts to design and develop maintainable Python projects",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Introduction to Machine Learning with Python",
          "author": "Emily",
          "content": "Exploring the fundamentals of machine learning using Python libraries",
          "rank": "4.8"
        }
      ]
    },
    {
      "category": "Marketing",
      "list_blog": [
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Python Programming for Beginners: Getting Started",
          "author": "Alice",
          "content": "A comprehensive guide to learning the basics of Python programming",
          "rank": "4.2"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Data Structures and Algorithms in Python",
          "author": "Bob",
          "content": "Understanding essential data structures and algorithms in Python",
          "rank": "4.9"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Web Development with JavaScript: Building Interactive Websites",
          "author": "Charlie",
          "content": "Learning JavaScript to create dynamic and engaging web pages",
          "rank": "4.4"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Object-Oriented Programming (OOP) in Python",
          "author": "David",
          "content": "Mastering OOP concepts to design and develop maintainable Python projects",
          "rank": "4.7"
        },
        {
          "img": "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-7.jpg",
          "title": "Introduction to Machine Learning with Python",
          "author": "Emily",
          "content": "Exploring the fundamentals of machine learning using Python libraries",
          "rank": "4.8"
        }
      ]
    }
  ]

def get_data(request):

    return JsonResponse(tmp)
