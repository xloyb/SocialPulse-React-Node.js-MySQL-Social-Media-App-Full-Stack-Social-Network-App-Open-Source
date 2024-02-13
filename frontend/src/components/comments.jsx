// const commentsdata = [
//   {
//     id: "1",
//     author: "user1",
//     profilepic:
//       "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//     text: "This is one comment.",
//   },
//   {
//     id: "2",
//     author: "user2",
//     profilepic:
//       "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//     text: "This is one comment.",
//   },
//   {
//     id: "3",
//     author: "user3",
//     profilepic:
//       "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//     text: "This is one comment.",
//   },
//   {
//     id: "4",
//     author: "user4",
//     profilepic:
//       "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//     text: "This is one comment.",
//   },
// ];

// const comments = () => {
//   return (


//     <div>
//       <div tabIndex={0} className="collapse collapse-open  bg-base-200">
//         <div className="collapse-title text-xl font-medium">comments</div>
//         <div className="max-h-44 overflow-auto collapse-content">


          
//           {commentsdata.map((comment) => (
//             <div key={comment.id} className="chat chat-start">
//               <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                   <img
//                     alt="Tailwind CSS chat bubble component"
//                     src={comment.profilepic}
//                   />
//                 </div>
//               </div>
//               <div className="chat-header">
//                 {comment.author}
//                 <time className="text-xs opacity-50">12:45</time>
//               </div>
//               <div className="chat-bubble">{comment.text}</div>
//             </div>
//           ))}

//           <div className="chat chat-start">
//             <div className="chat-image avatar">
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="Tailwind CSS chat bubble component"
//                   src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//                 />
//               </div>
//             </div>
//             <div className="chat-header">
//               Obi-Wan Kenobi
//               <time className="text-xs opacity-50">12:45</time>
//             </div>
//             <div className="chat-bubble">You were the Chosen One!</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default comments;
