
import type { Ordered } from "./Home_types";

export const WatchedOptions=['All','Movies','Shows']
export const ItemOptions=['Movies','Shows','Liked Items']

export const Years = Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, i) => 1970 + i);

export const Order:Ordered[]=[{name:'Most Popular',value:'popularity.desc'},
   {name:'Least Popular',value:'popularity.asc'},{name:'Highest Rated',value:'vote_average.desc'},{name:'Lowest Rated',value:'vote_average.asc'}]

export const MovieGenres = {
  '0':'All',
  '28': "Action",
  '12': "Adventure",
  '16': "Animation",
  '35': "Comedy",
  '80': "Crime",
  '99': "Documentary",
  '18': "Drama",
  '10751': "Family",
  '14': "Fantasy",
  '36': "History",
  '27': "Horror",
  '10402': "Music",
  '9648': "Mystery",
  '10749': "Romance",
  '878': "Science Fiction",
  '10770': "TV Movie",
  '53': "Thriller",
  '10752': "War",
  '37': "Western",
};

export const TVGenres = {
  '0':'All',
  '10759': "Action & Adventure",
  '16': "Animation",
  '35': "Comedy",
  '80': "Crime",
  '99': "Documentary",
  '18': "Drama",
  '10751': "Family",
  '10762': "Kids",
  '9648': "Mystery",
  '10763': "News",
  '10764': "Reality",
  '10765': "Sci-Fi & Fantasy",
  '10766': "Soap Opera",
  '10767': "Talk",
  '10768': "War & Politics",
  '37': "Western",
};




