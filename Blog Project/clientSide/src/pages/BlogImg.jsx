import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const BlogImg = () => {
  const { handleSubmit, register, reset } = useForm();
  const [allBlogs, setAllBlogs] = useState([]);
  const [edit, setEdit] = useState(null);

  const viewBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      console.log(res)
      setAllBlogs(res.data.blogs || []); 
    } catch (error) {
      console.error("Error fetching blogs", error);
      setAllBlogs([]); 
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
      viewBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const updateBlog = (blog) => {
    reset({
      blog_name: blog.blog_name,
      blog_cat: blog.blog_cat,
      blog_num: blog.blog_num,
      blog_desc: blog.blog_desc,
    });
    setEdit(blog);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("blog_name", data.blog_name);
    formData.append("blog_cat", data.blog_cat);
    formData.append("blog_num", data.blog_num);
    formData.append("blog_desc", data.blog_desc);
    if (data.blog_img?.[0]) {
      formData.append("blog_img", data.blog_img[0]);
    }

    try {
      if (edit) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/blogs/${edit._id}`,
          formData
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, formData);
      }

      reset({
        blog_name: "",
        blog_cat: "",
        blog_num: "",
        blog_desc: "",
        blog_img: null,
      });
      setEdit(null);
      viewBlogs();
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  useEffect(() => {
    viewBlogs();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <form
          className="col-lg-6 mx-auto my-5 p-5 shadow"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Blog Name"
              {...register("blog_name")}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Blog Category"
              {...register("blog_cat")}
            />
          </div>
          <div className="mt-4">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Blog Number"
              {...register("blog_num")}
            />
          </div>
          <div className="mt-4">
            <textarea
              className="form-control"
              placeholder="Enter Blog Description"
              {...register("blog_desc")}
            />
          </div>
          <div className="mt-4">
            <input
              type="file"
              className="form-control"
              {...register("blog_img")}
            />
          </div>
          <div className="mt-4">
            {edit ? (
              <button className="btn btn-warning">Update</button>
            ) : (
              <button className="btn btn-success">Submit</button>
            )}
          </div>
        </form>
      </div>

      <div className="row">
        {Array.isArray(allBlogs) && allBlogs.length === 0 && (
          <p className="text-center text-muted">No blogs found.</p>
        )}
        {Array.isArray(allBlogs) &&
          allBlogs.map((blog) => (
            <div key={blog._id} className="col-lg-4 col-md-6 col-sm-12 my-3">
              <div className="card shadow">
                <img
                // http://localhost:8020/uploads/1750054930750.jpg 
                  src={`http://localhost:8020${blog.blog_img}`}
                  className="card-img-top"
                  alt={blog.blog_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{blog.blog_name}</h5>
                  <p className="card-text">Category: {blog.blog_cat}</p>
                  <p className="card-text">Number: {blog.blog_num}</p>
                  <p className="card-text">Description: {blog.blog_desc}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => updateBlog(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteBlog(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogImg;
