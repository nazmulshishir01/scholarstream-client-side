import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiFilter, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useAxiosPublic from '../hooks/useAxiosPublic';
import ScholarshipCard, { ScholarshipCardSkeleton } from '../components/scholarship/ScholarshipCard';
import SectionTitle from '../components/shared/SectionTitle';

const AllScholarships = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [country, setCountry] = useState('all');
  const [degree, setDegree] = useState('all');
  const [sort, setSort] = useState('date-desc');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['filterOptions'],
    queryFn: async () => {
      const res = await axiosPublic.get('/scholarships/categories');
      return res.data;
    }
  });

  // Fetch scholarships
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['scholarships', search, category, country, degree, sort, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12'
      });
      
      if (search) params.append('search', search);
      if (category !== 'all') params.append('category', category);
      if (country !== 'all') params.append('country', country);
      if (degree !== 'all') params.append('degree', degree);
      if (sort) params.append('sort', sort);
      
      const res = await axiosPublic.get(`/scholarships?${params.toString()}`);
      return res.data;
    }
  });

  useEffect(() => {
    setPage(1);
  }, [search, category, country, degree, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setCountry('all');
    setDegree('all');
    setSort('date-desc');
    setPage(1);
  };

  const hasActiveFilters = search || category !== 'all' || country !== 'all' || degree !== 'all';

  return (
    <>
      <Helmet>
        <title>All Scholarships - ScholarStream</title>
      </Helmet>

      <div className="pt-24 pb-16 min-h-screen bg-base-200">
        <div className="container-custom">
          <SectionTitle
            title="Browse Scholarships"
            subtitle="Find the perfect scholarship opportunity for your educational journey"
          />

          {/* Search and Filter Bar */}
          <div className="bg-base-100 rounded-2xl shadow-lg p-4 lg:p-6 mb-8 border border-base-300">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, university, or degree..."
                  className="input-custom pl-12"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-outline flex items-center justify-center gap-2"
              >
                <FiFilter />
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    !
                  </span>
                )}
              </button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex gap-3">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-custom w-40"
                >
                  <option value="all">All Categories</option>
                  {filterOptions?.categories?.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="input-custom w-40"
                >
                  <option value="all">All Countries</option>
                  {filterOptions?.countries?.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="input-custom w-44"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="fees-asc">Fees: Low to High</option>
                  <option value="fees-desc">Fees: High to Low</option>
                </select>

                <button type="submit" className="btn-primary px-6">
                  Search
                </button>
              </div>
            </form>

            {/* Mobile Filters */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="lg:hidden mt-4 pt-4 border-t border-base-300 grid grid-cols-2 gap-3"
              >
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-custom"
                >
                  <option value="all">All Categories</option>
                  {filterOptions?.categories?.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="input-custom"
                >
                  <option value="all">All Countries</option>
                  {filterOptions?.countries?.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="input-custom"
                >
                  <option value="all">All Degrees</option>
                  {filterOptions?.degrees?.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="input-custom"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="fees-asc">Fees: Low to High</option>
                  <option value="fees-desc">Fees: High to Low</option>
                </select>

                <button onClick={handleSearch} className="btn-primary col-span-2">
                  Apply Filters
                </button>
              </motion.div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-base-content/60">Active filters:</span>
                {search && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                    Search: {search}
                    <button onClick={() => setSearch('')}><FiX size={14} /></button>
                  </span>
                )}
                {category !== 'all' && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                    {category}
                    <button onClick={() => setCategory('all')}><FiX size={14} /></button>
                  </span>
                )}
                {country !== 'all' && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                    {country}
                    <button onClick={() => setCountry('all')}><FiX size={14} /></button>
                  </span>
                )}
                {degree !== 'all' && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                    {degree}
                    <button onClick={() => setDegree('all')}><FiX size={14} /></button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-error hover:text-error/80 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-base-content/60">
              Showing {data?.scholarships?.length || 0} of {data?.total || 0} scholarships
            </p>
          </div>

          {/* Scholarships Grid - 4 cards per row on desktop */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <ScholarshipCardSkeleton key={i} />
              ))}
            </div>
          ) : data?.scholarships?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.scholarships.map((scholarship, index) => (
                  <motion.div
                    key={scholarship._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <ScholarshipCard scholarship={scholarship} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="p-2 rounded-lg bg-base-100 border border-base-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-base-200 transition-colors"
                    >
                      <FiChevronLeft size={20} />
                    </button>
                    
                    {[...Array(Math.min(data.totalPages, 5))].map((_, i) => {
                      let pageNum;
                      if (data.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= data.totalPages - 2) {
                        pageNum = data.totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={i}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            page === pageNum
                              ? 'bg-primary text-white'
                              : 'bg-base-100 border border-base-300 hover:bg-base-200 text-base-content'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === data.totalPages}
                      className="p-2 rounded-lg bg-base-100 border border-base-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-base-200 transition-colors"
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-base-100 rounded-2xl border border-base-300">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-base-content mb-2">No scholarships found</h3>
              <p className="text-base-content/60 mb-6">Try adjusting your search or filter criteria</p>
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllScholarships;
