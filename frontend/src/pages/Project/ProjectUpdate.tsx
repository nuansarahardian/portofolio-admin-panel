import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const API_URL = import.meta.env.VITE_API_URL;

const ProjectUpdate = () => {
  const { _id } = useParams<{ _id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    tech: '',
    category: '',
    image: null as File | null,
    link: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${API_URL}/project/${_id}`);
        const project = response.data;

        setFormData({
          title: project.title,
          desc: project.desc,
          tech: project.tech.join(', '),
          category: project.category,
          image: null,
          link: project.link,
        });
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Gagal memuat data proyek.');
      }
    };

    fetchProject();
  }, [_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('desc', formData.desc);
      data.append('tech', formData.tech);
      data.append('category', formData.category);
      data.append('link', formData.link);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await axios.put(`${API_URL}/projects/${_id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/projects');
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Gagal memperbarui proyek. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Update Project" />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Project
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Name"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="desc"
            placeholder="Description"
            required
            value={formData.desc}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="tech"
            placeholder="Technologies (comma separated)"
            required
            value={formData.tech}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            name="link"
            placeholder="Project Link"
            required
            value={formData.link}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Project'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectUpdate;
