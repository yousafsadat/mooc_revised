import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Example lecture data
const lectures = {
  c1: {
    id: "c1",
    title: "React Basics",
    lessons: [
      { id: "l1", title: "Introduction", videoId: "ysz5S6PUM-U" },
      { id: "l2", title: "Components", videoId: "Ke90Tje7VS0" },
      { id: "l3", title: "Props and State", videoId: "w7ejDZ8SWv8" },
    ],
  },
  c2: {
    id: "c2",
    title: "Node.js Basics",
    lessons: [
      { id: "l1", title: "Intro to Node.js", videoId: "TlB_eWDSMt4" },
      { id: "l2", title: "Event Loop", videoId: "8aGhZQkoFbQ" },
    ],
  },
};

const LectureContent = () => {
  const { courseId } = useParams();
  const course = lectures[courseId];
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!course) return;

    // Load YouTube Iframe API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Global callback required by YouTube API
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      // Create the player for the first lesson
      playerRef.current = new window.YT.Player("player", {
        videoId: course.lessons[0].videoId,
        events: {
          onReady: (event) => {
            // Update timestamp every second
            setInterval(() => {
              const time = event.target.getCurrentTime();
              setCurrentTime(time.toFixed(2)); // keep 2 decimal places
            }, 1000);
          },
        },
      });
    };
  }, [course]);

  if (!course) return <h2>Course not found</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* YouTube Iframe */}
          <div id="player" className="w-full h-80"></div>

          {/* Show Realtime Timestamp */}
          <p className="mt-4 text-lg font-semibold">
            Current Timestamp: {currentTime}s
          </p>
        </div>

        {/* Lessons List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
          <ul className="space-y-2">
            {course.lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="p-3 border rounded-lg bg-white shadow cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  if (playerRef.current) {
                    playerRef.current.loadVideoById(lesson.videoId);
                  }
                }}
              >
                {lesson.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LectureContent;
