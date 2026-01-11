import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiSave, FiX, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axiosSecure.post('/scholarships', data);
    },
    onSuccess: () => {
      toast.success('Scholarship added successfully!');
      reset();
      navigate('/dashboard/manage-scholarships');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add scholarship');
    }
  });

  const onSubmit = (data) => {
    const scholarshipData = {
      ...data,
      tuitionFees: data.tuitionFees ? parseInt(data.tuitionFees) : 0,
      applicationFees: parseInt(data.applicationFees),
      serviceCharge: parseInt(data.serviceCharge),
      universityWorldRank: parseInt(data.universityWorldRank),
      postedUserEmail: user.email,
      scholarshipPostDate: new Date().toISOString()
    };
    
    mutation.mutate(scholarshipData);
  };

  const subjectCategories = ['Agriculture', 'Engineering', 'Doctor', 'Business', 'Arts', 'Science', 'Law', 'Computer Science'];
  const scholarshipCategories = ['Full fund', 'Partial', 'Self-fund'];
  const degrees = ['Diploma', 'Bachelor', 'Masters', 'PhD'];

  const InputField = ({ label, name, type = 'text', required = false, placeholder, options }) => (
    <div>
      <label className="block text-sm font-medium text-base-content mb-2">
        {label} {required && <span className="text-error">*</span>}
      </label>
      {options ? (
        <select
          {...register(name, { required: required ? `${label} is required` : false })}
          className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        >
          <option value="">Select {label}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register(name, { required: required ? `${label} is required` : false })}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      )}
      {errors?.[name] && (
        <p className="text-error text-sm mt-1 flex items-center gap-1">
          <FiAlertCircle size={14} />
          {errors[name].message}
        </p>
      )}
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">Add New Scholarship</h1>
          <p className="text-base-content/60 mt-1">Create a new scholarship opportunity</p>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
            
            {/* Scholarship Name */}
            <InputField
              label="Scholarship Name"
              name="scholarshipName"
              required
              placeholder="e.g., Merit Scholarship 2024"
            />

            {/* University Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="University Name"
                name="universityName"
                required
                placeholder="e.g., Harvard University"
              />
              <InputField
                label="University Image URL"
                name="universityImage"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Country"
                name="universityCountry"
                required
                placeholder="e.g., United States"
              />
              <InputField
                label="City"
                name="universityCity"
                required
                placeholder="e.g., Cambridge"
              />
              <InputField
                label="World Rank"
                name="universityWorldRank"
                type="number"
                required
                placeholder="e.g., 1"
              />
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Subject Category"
                name="subjectCategory"
                options={subjectCategories}
                required
              />
              <InputField
                label="Scholarship Category"
                name="scholarshipCategory"
                options={scholarshipCategories}
                required
              />
              <InputField
                label="Degree"
                name="degree"
                options={degrees}
                required
              />
            </div>

            {/* Fees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Tuition Fees (Optional)"
                name="tuitionFees"
                type="number"
                placeholder="e.g., 50000"
              />
              <InputField
                label="Application Fees"
                name="applicationFees"
                type="number"
                required
                placeholder="e.g., 50"
              />
              <InputField
                label="Service Charge"
                name="serviceCharge"
                type="number"
                required
                placeholder="e.g., 10"
              />
            </div>

            {/* Deadline */}
            <InputField
              label="Application Deadline"
              name="applicationDeadline"
              type="date"
              required
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Scholarship Description <span className="text-error">*</span>
              </label>
              <textarea
                {...register('scholarshipDescription', { required: 'Description is required' })}
                className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                rows={4}
                placeholder="Describe the scholarship, eligibility criteria, benefits..."
              />
              {errors.scholarshipDescription && (
                <p className="text-error text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle size={14} />
                  {errors.scholarshipDescription.message}
                </p>
              )}
            </div>

            {/* Stipend Details */}
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Stipend/Coverage Details
              </label>
              <textarea
                {...register('stipendDetails')}
                className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                rows={3}
                placeholder="e.g., Full tuition, Monthly stipend of $1500, Health insurance..."
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-base-200">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <FiSave size={18} />
                    Add Scholarship
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard/manage-scholarships')}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border border-base-300 text-base-content font-semibold rounded-xl hover:bg-base-200 transition-all"
              >
                <FiX size={18} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddScholarship;
