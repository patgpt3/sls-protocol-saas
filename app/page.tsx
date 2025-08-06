'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderIcon, 
  DocumentArrowDownIcon, 
  PlayIcon,
  CogIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import RepositoryAnalyzer from './components/RepositoryAnalyzer'

interface Repository {
  name: string
  description: string
  language: string
  lastUpdated: string
  status: 'pending' | 'extracted' | 'building' | 'ready' | 'error'
  size?: string
}

const waevRepositories: Repository[] = [
  { name: 'waev-dash', description: 'Dashboard application', language: 'TypeScript', lastUpdated: 'Apr 22', status: 'pending' },
  { name: 'api', description: 'The api for resource access', language: 'TypeScript', lastUpdated: 'Mar 20', status: 'pending' },
  { name: 'waev-market', description: 'Marketplace frontend', language: 'TypeScript', lastUpdated: 'Dec 23, 2024', status: 'pending' },
  { name: 'ethSmartContracts', description: 'Ethereum smart contracts', language: 'TypeScript', lastUpdated: 'Dec 21, 2024', status: 'pending' },
  { name: 'access-server', description: 'The access server repo', language: 'TypeScript', lastUpdated: 'Sep 30, 2024', status: 'pending' },
  { name: 'access-core', description: 'Access core repo', language: 'JavaScript', lastUpdated: 'Sep 30, 2024', status: 'pending' },
  { name: 'middleware', description: 'The WaevData middleware in NestJS', language: 'TypeScript', lastUpdated: 'Jul 12, 2024', status: 'pending' },
  { name: 'infrastructure', description: 'The base infrastructure repo', language: 'HCL', lastUpdated: 'May 7, 2024', status: 'pending' },
  { name: 'access-client', description: 'The access client repo', language: 'JavaScript', lastUpdated: 'Mar 22, 2024', status: 'pending' },
  { name: 'stream-api', description: 'Streaming API service', language: 'TypeScript', lastUpdated: 'Mar 1, 2024', status: 'pending' },
]

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>(waevRepositories)
  const [isLoading, setIsLoading] = useState(false)
  const [buildProgress, setBuildProgress] = useState(0)
  const [activeTab, setActiveTab] = useState<'build' | 'analyze'>('build')

  const getStatusIcon = (status: Repository['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'building':
        return <CogIcon className="w-5 h-5 text-blue-500 animate-spin" />
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      default:
        return <FolderIcon className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: Repository['status']) => {
    switch (status) {
      case 'ready':
        return 'text-green-600 bg-green-50'
      case 'building':
        return 'text-blue-600 bg-blue-50'
      case 'error':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const pullFromLocalStorage = async () => {
    setIsLoading(true)
    setBuildProgress(0)
    
    // Simulate pulling from localStorage
    for (let i = 0; i < repositories.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setRepositories(prev => 
        prev.map((repo, index) => 
          index === i ? { ...repo, status: 'extracted' as const } : repo
        )
      )
      setBuildProgress((i + 1) / repositories.length * 100)
    }
    
    setIsLoading(false)
  }

  const buildSaaSApp = async () => {
    setIsLoading(true)
    setBuildProgress(0)
    
    // Simulate building process
    for (let i = 0; i < repositories.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setRepositories(prev => 
        prev.map((repo, index) => 
          index === i ? { ...repo, status: 'building' as const } : repo
        )
      )
      setBuildProgress((i + 1) / repositories.length * 50)
    }
    
    // Complete building
    for (let i = 0; i < repositories.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setRepositories(prev => 
        prev.map((repo, index) => 
          index === i ? { ...repo, status: 'ready' as const } : repo
        )
      )
      setBuildProgress(50 + (i + 1) / repositories.length * 50)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-waev-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-waev-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">WaevLabs SaaS</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={pullFromLocalStorage}
                disabled={isLoading}
                className="btn-secondary flex items-center space-x-2"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                <span>Pull from localStorage</span>
              </button>
              <button
                onClick={buildSaaSApp}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2"
              >
                <PlayIcon className="w-5 h-5" />
                <span>Build SaaS App</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('build')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'build'
                  ? 'border-waev-500 text-waev-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <PlayIcon className="w-5 h-5" />
                <span>Build System</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analyze'
                  ? 'border-waev-500 text-waev-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span>Repository Analyzer</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'build' ? (
          <>
            {/* Progress Bar */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Build Progress</h3>
                    <span className="text-sm text-gray-500">{Math.round(buildProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-waev-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${buildProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Repository Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(repo.status)}
                        <h3 className="text-lg font-semibold text-gray-900">{repo.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{repo.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Language: {repo.language}</span>
                        <span className="text-gray-500">Updated: {repo.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(repo.status)}`}>
                      {repo.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Build Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-waev-600">{repositories.length}</div>
                  <div className="text-sm text-gray-500">Total Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {repositories.filter(r => r.status === 'ready').length}
                  </div>
                  <div className="text-sm text-gray-500">Ready</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {repositories.filter(r => r.status === 'building').length}
                  </div>
                  <div className="text-sm text-gray-500">Building</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {repositories.filter(r => r.status === 'error').length}
                  </div>
                  <div className="text-sm text-gray-500">Errors</div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <RepositoryAnalyzer />
        )}
      </main>
    </div>
  )
} 