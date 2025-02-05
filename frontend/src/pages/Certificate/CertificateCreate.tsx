import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const CertificateCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null, // Update image state untuk file
    title: '',
    year: '',
    company: '',
    category: '',
  });

  // Handle input change (untuk text fields)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('year', formData.year);
    data.append('company', formData.company);
    data.append('category', formData.category);

    try {
      const response = await fetch('http://localhost:5000/certificates', {
        method: 'POST',
        body: data, // Kirim FormData (termasuk file)
      });

      if (!response.ok) {
        throw new Error('Gagal menambahkan data Certificate');
      }

      alert('Data berhasil ditambahkan!');
      navigate('/certificate');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Certificate" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Create Certificate Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Certificate
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                {/* Image */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange} // Handle file change
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Title */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter your Title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Year */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Enter your year"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Company */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Company
                  </label>
                  <textarea
                    name="company"
                    rows={4}
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter your company"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  ></textarea>
                </div>

                {/* Category */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category
                  </label>
                  <textarea
                    name="category"
                    rows={4}
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Enter your category"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateCreate;
