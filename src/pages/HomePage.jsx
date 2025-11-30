import { blogs } from "../data/blogs";

const HomePage = () => {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-text">
          <h1>Long-Term Portfolio Management</h1>
          <p>
            We focus on disciplined, data-driven portfolio management that
            compounds your wealth steadily over time.
          </p>
        </div>
      </section>

      <section className="blogs-section">
        <h2>Insights &amp; Research</h2>
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <article key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <p className="blog-meta">
                {blog.author} •{" "}
                {new Date(blog.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <button className="blog-read-more">Read more</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
