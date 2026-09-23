import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../../services/noticeService";

import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import SearchBar from "../../components/common/SearchBar";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import NoticeForm from "../../components/notices/NoticeForm";

import {
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const NoticesPage = () => {

  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedNotice, setSelectedNotice] =
    useState(null);

  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  const [noticeToDelete, setNoticeToDelete] =
    useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await getAllNotices();

      setNotices(response.data);

    } catch (error) {

      toast.error("Failed to load notices");

    } finally {

      setLoading(false);

    }
  };

  const handleSave = async (data) => {

    try {

      if (selectedNotice) {

        await updateNotice(
          selectedNotice._id,
          data
        );

        toast.success("Notice updated successfully");

      } else {

        await createNotice(data);

        toast.success("Notice added successfully");

      }

      setShowForm(false);

      setSelectedNotice(null);

      fetchNotices();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );

    }

  };

  const handleDelete = async () => {

    try {

      await deleteNotice(noticeToDelete._id);

      toast.success("Notice deleted successfully");

      setShowDeleteDialog(false);

      setNoticeToDelete(null);

      fetchNotices();

    } catch (error) {

      toast.error("Failed to delete notice");

    }

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-96">
        Loading...
      </div>
    );

  }

    const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
            High
          </span>
        );

      case "Medium":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            Medium
          </span>
        );

      default:
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Low
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <PageHeader
        title="📢 Notices"
        subtitle="Manage announcements for farmers."
        action={
          <button
            onClick={() => {
              setSelectedNotice(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <FaPlus />
            Add Notice
          </button>
        }
      />

      <Card className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notice..."
        />
      </Card>

      <Card className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="px-6 py-4 text-left">#</th>

              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Description
              </th>

              <th className="px-6 py-4 text-center">
                Priority
              </th>

              <th className="px-6 py-4 text-center">
                Expiry
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {notices
              .filter((notice) =>
                notice.title
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((notice, index) => (

                <tr
                  key={notice._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {notice.title}
                  </td>

                  <td className="px-6 py-4 max-w-md">
                    {notice.description}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {getPriorityBadge(notice.priority)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {new Date(
                      notice.expiryDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {
                          setSelectedNotice(notice);
                          setShowForm(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setNoticeToDelete(notice);
                          setShowDeleteDialog(true);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </Card>

      {showForm && (
        <NoticeForm
          notice={selectedNotice}
          onClose={() => {
            setShowForm(false);
            setSelectedNotice(null);
          }}
          onSave={handleSave}
        />
      )}

      {showDeleteDialog && (
        <ConfirmDialog
          title="Delete Notice"
          message={`Are you sure you want to delete "${noticeToDelete?.title}"?`}
          onCancel={() => {
            setShowDeleteDialog(false);
            setNoticeToDelete(null);
          }}
          onConfirm={handleDelete}
        />
      )}

    </div>
  );
};

export default NoticesPage;