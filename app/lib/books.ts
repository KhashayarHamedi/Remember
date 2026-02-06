/**
 * Feeling → meditation/mindfulness book suggestion with cover.
 * Covers via Open Library (covers.openlibrary.org/b/isbn/{isbn}-L.jpg).
 */

import type { FeelingId } from "./rituals";

export interface BookSuggestion {
  title: string;
  author: string;
  isbn: string;
  blurb: string;
}

const OPEN_LIBRARY_COVER = (isbn: string) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const BOOKS: Record<FeelingId, BookSuggestion> = {
  calm: {
    title: "Wherever You Go, There You Are",
    author: "Jon Kabat-Zinn",
    isbn: "0307833692",
    blurb: "Mindfulness meditation for everyday life.",
  },
  peaceful: {
    title: "The Miracle of Mindfulness",
    author: "Thich Nhat Hanh",
    isbn: "0807012394",
    blurb: "Simple practices for peace and presence.",
  },
  content: {
    title: "The Book of Joy",
    author: "Dalai Lama & Desmond Tutu",
    isbn: "0399185045",
    blurb: "Lasting happiness in a changing world.",
  },
  happy: {
    title: "The How of Happiness",
    author: "Sonja Lyubomirsky",
    isbn: "0143114956",
    blurb: "A practical guide to getting the life you want.",
  },
  energized: {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    isbn: "1577314808",
    blurb: "A guide to spiritual enlightenment.",
  },
  motivated: {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "0735211299",
    blurb: "Tiny changes, remarkable results.",
  },
  grateful: {
    title: "Thanks!",
    author: "Robert A. Emmons",
    isbn: "0547085737",
    blurb: "How the new science of gratitude can make you happier.",
  },
  hopeful: {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    isbn: "080701429X",
    blurb: "Finding purpose in the midst of suffering.",
  },
  stressed: {
    title: "The Untethered Soul",
    author: "Michael A. Singer",
    isbn: "1572245379",
    blurb: "The journey beyond yourself.",
  },
  anxious: {
    title: "The Anxiety and Phobia Workbook",
    author: "Edmund J. Bourne",
    isbn: "1684034838",
    blurb: "Practical, step-by-step help for anxiety.",
  },
  sad: {
    title: "When Things Fall Apart",
    author: "Pema Chödrön",
    isbn: "1590302268",
    blurb: "Heart advice for difficult times.",
  },
  lonely: {
    title: "Together",
    author: "Vivek H. Murthy",
    isbn: "0062913298",
    blurb: "The healing power of human connection.",
  },
  angry: {
    title: "Radical Acceptance",
    author: "Tara Brach",
    isbn: "0553380990",
    blurb: "Embracing your life with the heart of a Buddha.",
  },
  frustrated: {
    title: "Nonviolent Communication",
    author: "Marshall B. Rosenberg",
    isbn: "1892005034",
    blurb: "A language of life.",
  },
  tired: {
    title: "The Art of Rest",
    author: "Claudia Hammond",
    isbn: "1472143560",
    blurb: "How to find respite in the modern age.",
  },
  exhausted: {
    title: "Rest",
    author: "Alex Soojung-Kim Pang",
    isbn: "0465074871",
    blurb: "Why you get more done when you work less.",
  },
  overwhelmed: {
    title: "Essentialism",
    author: "Greg McKeown",
    isbn: "0804137382",
    blurb: "The disciplined pursuit of less.",
  },
  unfocused: {
    title: "Deep Work",
    author: "Cal Newport",
    isbn: "1455586692",
    blurb: "Rules for focused success in a distracted world.",
  },
  restless: {
    title: "Stillness Is the Key",
    author: "Ryan Holiday",
    isbn: "0525538585",
    blurb: "Finding calm in a noisy world.",
  },
  numb: {
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    isbn: "0143127748",
    blurb: "Brain, mind, and body in the healing of trauma.",
  },
};

export function getBookForFeeling(feelingId: FeelingId): BookSuggestion {
  return BOOKS[feelingId];
}

export function getBookCoverUrl(book: BookSuggestion): string {
  return OPEN_LIBRARY_COVER(book.isbn);
}
