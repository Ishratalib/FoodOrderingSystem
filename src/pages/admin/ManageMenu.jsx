import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import {
  HiOutlineCollection,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
} from "react-icons/hi";
import {
  fetchMenuItems,
  fetchMenuItemById,
  fetchRestaurants,
  fetchCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../redux/slices/menuAdminSlice";
import MenuDetailModal from "../../components/AdminMenu/MenuDetailModal";
const emptyForm = {
  name: "",
  description: "",
  price: "",
  restaurant_id: "",
  category_id: "",
  image: null,
  is_available: true,
  is_featured: false,
};

const ManageMenu = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const dispatch = useDispatch();

  const {
    items,
    restaurants,
    categories,
    loading,
    submitting,
    fetchingSingle,
  } = useSelector((state) => state.menuAdmin);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    console.log("ManageMenu mounted");

    dispatch(fetchMenuItems());
    dispatch(fetchRestaurants());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openViewModal = async (item) => {
    const result = await dispatch(fetchMenuItemById(item.id));

    if (fetchMenuItemById.fulfilled.match(result)) {
      setSelectedItem(result.payload);
      setShowViewModal(true);
    } else {
      alert("Failed to load item details.");
    }
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedItem(null);
  };

  // ============ ADD MODAL KHOLNA ============
  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  // ============ EDIT MODAL KHOLNA (fresh single-item data ke sath) ============
  const openEditModal = async (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setShowModal(true);

    const result = await dispatch(fetchMenuItemById(item.id));

    if (fetchMenuItemById.fulfilled.match(result)) {
      const freshItem = result.payload;
      setFormData({
        name: freshItem.name || "",
        description: freshItem.description || "",
        price: freshItem.price || "",
        restaurant_id: freshItem.restaurant?.id || "",
        category_id: freshItem.category?.id || "",
        image: null, // sirf naya select karne par update hoga
        is_available: freshItem.is_available ?? true,
        is_featured: freshItem.is_featured ?? false,
      });
    } else {
      alert("Failed to load item details.");
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
    setFormData(emptyForm);
  };

  // ============ SUBMIT: ADD ya UPDATE ============
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const result = await dispatch(
        updateMenuItem({ id: editId, formValues: formData }),
      );
      if (updateMenuItem.fulfilled.match(result)) {
        closeModal();
      } else {
        console.error("Update failed:", result.payload);
        alert("Failed to update item.");
      }
    } else {
      const result = await dispatch(createMenuItem(formData));
      if (createMenuItem.fulfilled.match(result)) {
        closeModal();
      } else {
        console.error("Create failed:", result.payload);
        alert("Failed to add item.");
      }
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const result = await dispatch(deleteMenuItem(deleteId));

    if (!deleteMenuItem.fulfilled.match(result)) {
      console.error("Delete failed:", result.payload);
      alert("Failed to delete item.");
    }

    setShowDeleteModal(false);
    setDeleteId(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FC8A06]">
            <HiOutlineCollection className="w-5 h-5 text-white" />
          </div>
          <h1
            className={`text-xl sm:text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Manage Menu
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#FC8A06] hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors duration-200"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div
        className={`rounded-2xl p-4 sm:p-6 shadow-sm transition-colors duration-300 ${
          isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
        }`}
      >
        {loading ? (
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            Loading menu items...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[560px]">
              <thead>
                <tr
                  className={`text-left border-b ${isDark ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"}`}
                >
                  <th className="pb-3 font-medium">Item Name</th>
                  <th className="pb-3 font-medium">Restaurant</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b last:border-0 ${isDark ? "border-white/5" : "border-gray-100"}`}
                  >
                    <td
                      className={`py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {item.name}
                    </td>
                    <td
                      className={`py-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {item.restaurant?.name || "—"}
                    </td>
                    <td
                      className={`py-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {item.category?.name || "Uncategorized"}
                    </td>
                    <td
                      className={`py-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      £{item.price}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openViewModal(item)}
                          className={`p-2 rounded-full transition-colors ${
                            isDark
                              ? "hover:bg-white/10 text-gray-300"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          <HiOutlineEye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => openEditModal(item)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            isDark
                              ? "hover:bg-white/10 text-gray-300"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors duration-200"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ============ ADD / EDIT MODAL (dono ke liye ek hi) ============ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-md rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${
              isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
            }`}
          >
            <h2
              className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {isEditing ? "Edit Menu Item" : "Add Menu Item"}
            </h2>

            {fetchingSingle ? (
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Loading item details...
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  name="name"
                  placeholder="Item name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg text-sm border border-gray-300 outline-none"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg text-sm border border-gray-300 outline-none"
                />

                <input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg text-sm border border-gray-300 outline-none"
                />

                <select
                  name="restaurant_id"
                  value={formData.restaurant_id}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg text-sm border border-gray-300 outline-none"
                >
                  <option value="">Select Restaurant</option>
                  {restaurants.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>

                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg text-sm border border-gray-300 outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="w-full text-sm"
                />
                {isEditing && (
                  <p
                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Leave image empty to keep the current one
                  </p>
                )}

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleFormChange}
                  />
                  Available
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleFormChange}
                  />
                  Featured
                </label>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#FC8A06] hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-full transition-colors duration-200"
                  >
                    {submitting
                      ? "Saving..."
                      : isEditing
                        ? "Update Item"
                        : "Add Item"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold border ${
                      isDark
                        ? "border-white/20 text-gray-300"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            className={`w-full max-w-md rounded-2xl p-6 shadow-xl ${
              isDark ? "bg-[#0b1020]" : "bg-white"
            }`}
          >
            <h2
              className={`text-xl font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Delete Menu Item
            </h2>

            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Are you sure you want to delete this menu item?
            </p>

            <p className="text-red-500 text-sm mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={cancelDelete}
                className={`px-5 py-2 rounded-full border ${
                  isDark
                    ? "border-white/20 text-white"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showViewModal && (
        <MenuDetailModal item={selectedItem} onClose={closeViewModal} />
      )}
    </div>
  );
};

export default ManageMenu;
