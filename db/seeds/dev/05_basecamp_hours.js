exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("project_hours")
    .del()
    .then(function() {
      // Inserts seed entries
      let sample_user = knex("users")
        .where({ email: "sample@email.com" })
        .select("id");
      return knex("project_hours").insert([
        {
          project_id: 1,
          user_id: sample_user,
          hrs_worked: 3.3,
          log_day: "2020-01-17"
        },
        {
          project_id: 1,
          user_id: sample_user,
          hrs_worked: 4.2,
          log_day: "2020-01-21"
        },
        {
          project_id: 1,
          user_id: sample_user,
          hrs_worked: 4.6,
          log_day: "2020-01-22"
        },
        {
          project_id: 1,
          user_id: sample_user,
          hrs_worked: 3.8,
          log_day: "2020-01-27"
        },
        {
          project_id: 1,
          user_id: sample_user,
          hrs_worked: 4.1,
          log_day: "2020-01-28"
        },
        {
          project_id: 1,
          user_id: sample_user,
          hrs_worked: 5.8,
          log_day: "2020-01-30"
        },
        {
          project_id: 1,
          user_id: sample_user,
          hrs_worked: 6.2,
          log_day: "2020-01-31"
        },
        {
          project_id: 1,
          user_id: sample_user,
          hrs_worked: 2.3,
          log_day: "2020-02-01"
        },
        {
          project_id: 1,
          user_id: sample_user,
          hrs_worked: 3.8,
          log_day: "2020-02-02"
        }
      ]);
    });
};

// import {useState, useEffect} from 'react'

// const useResize = (callback) => {
//   const [resize, setResize] = useState(false)

  
// }

// const useInfiniteScroll = (callback) => {
//   const [isFetching, setIsFetching] = useState(false);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!isFetching) return;
//     callback(() => {
//       console.log('called back');
//     });
//   }, [isFetching]);

//   function handleScroll() {
//     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
//     setIsFetching(true);
//   }

//   return [isFetching, setIsFetching];
// };

// export default useInfiniteScroll;

// //107
// export const debounce = (
//   n: number,
//   fn: (...params: unknown[]) => unknown,
//   immed = false
// ): (() => void) => {
//   let timer: NodeJS.Timeout;
//   return function (this: unknown, ...args: unknown[]) {
//     if (timer === undefined && immed) {
//       fn.apply(this, args);
//     }
//     clearTimeout(timer);
//     timer = setTimeout(() => fn.apply(this, args), n);
//     return timer;
//   };
// };

// const useInfiniteScroll = (
//   callback: () => void
// ): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
//   const [loading, setLoading] = useState(false);
//   let mounted = true;

//   const handleScroll = () => {
//     if (!mounted) return;
//     if (
//       window.innerHeight +
//         Math.max(
//           window.pageYOffset,
//           document.documentElement.scrollTop,
//           document.body.scrollTop
//         ) !==
//         document.documentElement.offsetHeight ||
//       loading
//     )
//       return;
//     setLoading(true);
//   };
//   useEffect(() => {
//     if (typeof window === undefined) return;
//     debugger;
//     window.addEventListener('scroll', debounce(1000, handleScroll));
//     return () => {
//       mounted = false;
//       window.removeEventListener('scroll', handleScroll);
//     };
//   });

//   useEffect(() => {
//     if (!loading) return;
//     callback();
//   }, [loading]);

//   return [loading, setLoading];
// };

// export default useInfiniteScroll;