import { useState, useEffect } from 'react';
import { FiFilter, FiPlusCircle } from 'react-icons/fi';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useFetchChapterByCourseIdQuery } from '../service/chapterApi';
import { setChapter } from '../slices/chapterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import ModalChapter from './ModalChapter';
import Card from './Card';

const Chapter = () => {
  const [showModalChapter, setshowModalChapter] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: chapter,
    isError,
    isLoading,
  } = useFetchChapterByCourseIdQuery(id);

  const chapters = useSelector((state) => state.chapter.items);

  useEffect(() => {
    if (chapter) {
      dispatch(setChapter(chapter));
    }
  }, [dispatch, chapter]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center">Error...</div>;

  return (
    <>
      <Link
        to="/course"
        className="flex primary-text font-medium mb-2 text-lg items-center ms-3">
        <FaArrowAltCircleLeft className="me-2 hover:text-[#68c092] transition-colors duration-300 ease-in-out" />
        <button className="primary-text py-2 px-2 hover:text-[#68c092] transition-colors duration-300 ease-in-out">
          Back to Course
        </button>
      </Link>
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex text-center items-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">CHAPTER</h2>
          <div className="flex items-center justify-between gap-3">
            <button
              className="flex text-white items-center justify-center primary rounded-full px-3 font-medium gap-2 py-[2px]"
              onClick={() => setshowModalChapter(true)}>
              <FiPlusCircle />
              Tambah
            </button>
            {/* <button
            className="flex items-center justify-center primary-text border-[#73daa4] border-2 rounded-full px-6 font-bold gap-2"
            onClick={handleFilterClick}
          >
            <FiFilter className="primary-text" />
            Filter
          </button>
          {isSearchActive ? (
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="border-2 rounded-full border-[#73daa4] p-0 ps-4 me-1 focus:outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none right-16 top 1/2 "
                >
                  &times;
                </button>
              )}
            </form>
          ) : (
            <MdOutlineSearch
              className="w-6 h-6 primary-text cursor-pointer"
              onClick={handleSearchClick}
            />
          )} */}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-[#EBF3FC] on-primary-text text-sm font-normal">
              <tr className="h-12">
                <th className="px-3 py-2">No</th>
                <th className="px-3 py-2">Nama Chapter</th>
                {/* <th className="px-3 py-2">Total Durasi</th> */}
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter, index) => (
                <tr className="h-12" key={index}>
                  <td className="text-center text-xs font-bold text-[#4E5566] px-3 py-2">
                    {index + 1}
                  </td>
                  <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                    {chapter.name}
                  </td>
                  {/* <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                {chapter.totalDuration}
              </td> */}
                  {/* <td className="text-center text-xs font-bold text-[#4E5566] px-3 py-2">
                <a
                  href={chapter.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chapter.videoLink}
                </a>
              </td> */}
                  <td className="text-center text-xs font-bold px-3 py-2">
                    <button className="bg-blue-500 px-2 py-1 rounded-md text-white mr-2">
                      Video
                    </button>
                    <button
                      className="bg-green-500 px-2 py-1 rounded-md text-white"
                      onClick={() => handleEditClick(chapter.id)}>
                      Ubah
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalChapter
          showModalChapter={showModalChapter}
          setshowModalChapter={setshowModalChapter}
        />
      </div>
    </>
  );
};

export default Chapter;