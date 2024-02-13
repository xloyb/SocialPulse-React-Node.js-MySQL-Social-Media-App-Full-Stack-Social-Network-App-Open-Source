
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const storiesData = [
  {
    id: 1,
    username: "john_doe",
    imageUrl:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  },
  {
    id: 2,
    username: "jane_smith",
    imageUrl:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  },
  {
    id: 3,
    username: "jane_smith",
    imageUrl:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  },
  {
    id: 4,
    username: "jane_smith",
    imageUrl:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  },
  {
    id: 5,
    username: "jane_smith",
    imageUrl:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  },

];

const Stories = () => {
  return (
    <div>
      <div className="max-w-96 xl:max-w-3xl  flex space-x-4 overflow-x-auto p-4 bg-base-200">
        <div className="card bg-base-100 shadow-xl flex-shrink-0 w-48">
          <div className="card-body p-0">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Add Story"
              size="lg"
            />
          </div>
          <div className="card-footer text-center">
            <span className="text-xs font-semibold">Add Story</span>
          </div>
        </div>
        {storiesData.map((story) => (
          <div
            key={story.id}
            className="card bg-base-100 shadow-xl flex-shrink-0 w-48"
          >
            <div className="card-body p-0">
              <img src={story.imageUrl} alt={story.username} size="lg" />
            </div>
            <div className="card-footer text-center">
              <span className="text-xs font-semibold">{story.username}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
