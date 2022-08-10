import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = ({ post, setDeleteState }) => {
  const alertNotif = async _id => {
    if (window.confirm('Are you sure you want to delete the post?') === true) {
      await axios.delete(`/api/blogs/delete/${_id}`);
      setDeleteState(true);
    }
    return;
  };

  return (
    <div className="px-0 my-6 w-full">
      <div className="flex flex-col">
        {post.map(element => (
          <div className="grid grid-cols-5 gap-3 h-32 md:h-48 lg:h-60 mb-10 xl:mb-12 cursor-pointer">
            <Link
              to={`/blogs/${element._id}`}
              className="col-span-3 flex flex-col gap-2"
              key={element._id}
            >
              <p className="text-lg md:text-xl font-black break-words">
                {element.title}
              </p>
              <p className="text-sm md:text-base hidden md:block break-words">
                {element.description}
              </p>
              <span className="flex text-xs items-center">
                <p className="mr-1">
                  {element.createdAt &&
                    new Date(element.createdAt.slice(0, 10))
                      .toDateString()
                      .slice(4, -5)}{' '}
                  &#x22C5;
                </p>
                <p className="rounded-xl bg-[rgba(225,225,225,0.7)] py-1 px-2">
                  {element.category}
                </p>
              </span>
            </Link>

            <img
              alt=""
              src={element.imgurlblog}
              className="col-span-2 w-auto h-full"
            />

            <input
              type="button"
              value="Delete"
              className="text-sm self-start w-fit py-1 px-2 rounded-md bg-[#DC3545] text-white hover:bg-[rgb(220,53,69,0.8)] transition-all cursor-pointer"
              onClick={() => alertNotif(element._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Post;
