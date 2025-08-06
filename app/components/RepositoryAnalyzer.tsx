'use client'

import { useState, useEffect } from 'react'
import JSZip from 'jszip'
import { motion } from 'framer-motion'
import { 
  DocumentTextIcon, 
  FolderIcon, 
  CodeBracketIcon,
  MagnifyingGlassIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface RepositoryAnalysis {
  name: string
  readme: string
  packageJson?: any
  dependencies: string[]
  devDependencies: string[]
  scripts: string[]
  description: string
  version: string
  mainEntry?: string
  buildScript?: string
  startScript?: string
  hasDockerfile: boolean
  hasDockerCompose: boolean
  hasGitHubActions: boolean
  techStack: string[]
  architecture: string[]
  deploymentInfo: string[]
  issues: string[]
  recommendations: string[]
}

export default function RepositoryAnalyzer() {
  const [analysis, setAnalysis] = useState<RepositoryAnalysis[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentRepo, setCurrentRepo] = useState('')
  const [progress, setProgress] = useState(0)
  const [selectedRepo, setSelectedRepo] = useState<RepositoryAnalysis | null>(null)

  const analyzeZipFile = async (zipData: string, repoName: string): Promise<RepositoryAnalysis> => {
    const zip = new JSZip()
    const zipContent = await zip.loadAsync(zipData)
    
    let readme = ''
    let packageJson: any = null
    let hasDockerfile = false
    let hasDockerCompose = false
    let hasGitHubActions = false
    const techStack: string[] = []
    const architecture: string[] = []
    const deploymentInfo: string[] = []
    const issues: string[] = []
    const recommendations: string[] = []

    // Extract README files
    for (const [fileName, file] of Object.entries(zipContent.files)) {
      if (!file.dir) {
        const content = await file.async('text')
        
        // Find README files
        if (fileName.toLowerCase().includes('readme')) {
          readme += `\n\n## ${fileName}\n\n${content}`
        }
        
        // Find package.json
        if (fileName.includes('package.json')) {
          try {
            packageJson = JSON.parse(content)
          } catch (e) {
            issues.push(`Invalid package.json in ${fileName}`)
          }
        }
        
        // Check for Docker files
        if (fileName.includes('Dockerfile')) {
          hasDockerfile = true
          deploymentInfo.push('Docker containerization available')
        }
        
        if (fileName.includes('docker-compose')) {
          hasDockerCompose = true
          deploymentInfo.push('Docker Compose configuration available')
        }
        
        // Check for GitHub Actions
        if (fileName.includes('.github/workflows')) {
          hasGitHubActions = true
          deploymentInfo.push('GitHub Actions CI/CD configured')
        }
        
        // Analyze tech stack based on file extensions
        if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
          if (!techStack.includes('TypeScript')) techStack.push('TypeScript')
        }
        if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) {
          if (!techStack.includes('JavaScript')) techStack.push('JavaScript')
        }
        if (fileName.endsWith('.py')) {
          if (!techStack.includes('Python')) techStack.push('Python')
        }
        if (fileName.endsWith('.go')) {
          if (!techStack.includes('Go')) techStack.push('Go')
        }
        if (fileName.endsWith('.rs')) {
          if (!techStack.includes('Rust')) techStack.push('Rust')
        }
        if (fileName.includes('nest')) {
          if (!techStack.includes('NestJS')) techStack.push('NestJS')
        }
        if (fileName.includes('react')) {
          if (!techStack.includes('React')) techStack.push('React')
        }
        if (fileName.includes('next')) {
          if (!techStack.includes('Next.js')) techStack.push('Next.js')
        }
        if (fileName.includes('vue')) {
          if (!techStack.includes('Vue.js')) techStack.push('Vue.js')
        }
        if (fileName.includes('angular')) {
          if (!techStack.includes('Angular')) techStack.push('Angular')
        }
        if (fileName.includes('express')) {
          if (!techStack.includes('Express.js')) techStack.push('Express.js')
        }
        if (fileName.includes('fastapi')) {
          if (!techStack.includes('FastAPI')) techStack.push('FastAPI')
        }
        if (fileName.includes('django')) {
          if (!techStack.includes('Django')) techStack.push('Django')
        }
        if (fileName.includes('flask')) {
          if (!techStack.includes('Flask')) techStack.push('Flask')
        }
        if (fileName.includes('prisma')) {
          if (!techStack.includes('Prisma')) techStack.push('Prisma')
        }
        if (fileName.includes('mongoose')) {
          if (!techStack.includes('MongoDB')) techStack.push('MongoDB')
        }
        if (fileName.includes('postgres')) {
          if (!techStack.includes('PostgreSQL')) techStack.push('PostgreSQL')
        }
        if (fileName.includes('mysql')) {
          if (!techStack.includes('MySQL')) techStack.push('MySQL')
        }
        if (fileName.includes('redis')) {
          if (!techStack.includes('Redis')) techStack.push('Redis')
        }
        if (fileName.includes('kafka')) {
          if (!techStack.includes('Kafka')) techStack.push('Kafka')
        }
        if (fileName.includes('elasticsearch')) {
          if (!techStack.includes('Elasticsearch')) techStack.push('Elasticsearch')
        }
        if (fileName.includes('terraform')) {
          if (!techStack.includes('Terraform')) techStack.push('Terraform')
        }
        if (fileName.includes('kubernetes')) {
          if (!techStack.includes('Kubernetes')) techStack.push('Kubernetes')
        }
        if (fileName.includes('helm')) {
          if (!techStack.includes('Helm')) techStack.push('Helm')
        }
        if (fileName.includes('aws')) {
          if (!techStack.includes('AWS')) techStack.push('AWS')
        }
        if (fileName.includes('gcp')) {
          if (!techStack.includes('Google Cloud')) techStack.push('Google Cloud')
        }
        if (fileName.includes('azure')) {
          if (!techStack.includes('Azure')) techStack.push('Azure')
        }
      }
    }

    // Analyze architecture patterns
    if (readme.toLowerCase().includes('microservice')) {
      architecture.push('Microservices')
    }
    if (readme.toLowerCase().includes('monolith')) {
      architecture.push('Monolithic')
    }
    if (readme.toLowerCase().includes('serverless')) {
      architecture.push('Serverless')
    }
    if (readme.toLowerCase().includes('event-driven')) {
      architecture.push('Event-Driven')
    }
    if (readme.toLowerCase().includes('api gateway')) {
      architecture.push('API Gateway')
    }
    if (readme.toLowerCase().includes('load balancer')) {
      architecture.push('Load Balancing')
    }
    if (readme.toLowerCase().includes('circuit breaker')) {
      architecture.push('Circuit Breaker')
    }

    // Generate recommendations
    if (!hasDockerfile && packageJson) {
      recommendations.push('Consider adding Dockerfile for containerization')
    }
    if (!hasGitHubActions) {
      recommendations.push('Add GitHub Actions for CI/CD automation')
    }
    if (packageJson && !packageJson.scripts?.build) {
      recommendations.push('Add build script to package.json')
    }
    if (packageJson && !packageJson.scripts?.start) {
      recommendations.push('Add start script to package.json')
    }
    if (techStack.includes('TypeScript') && !techStack.includes('ESLint')) {
      recommendations.push('Add ESLint for TypeScript code quality')
    }

    return {
      name: repoName,
      readme: readme || 'No README found',
      packageJson,
      dependencies: packageJson?.dependencies ? Object.keys(packageJson.dependencies) : [],
      devDependencies: packageJson?.devDependencies ? Object.keys(packageJson.devDependencies) : [],
      scripts: packageJson?.scripts ? Object.keys(packageJson.scripts) : [],
      description: packageJson?.description || 'No description available',
      version: packageJson?.version || 'Unknown',
      mainEntry: packageJson?.main,
      buildScript: packageJson?.scripts?.build,
      startScript: packageJson?.scripts?.start,
      hasDockerfile,
      hasDockerCompose,
      hasGitHubActions,
      techStack,
      architecture,
      deploymentInfo,
      issues,
      recommendations
    }
  }

  const analyzeAllRepositories = async () => {
    setIsAnalyzing(true)
    setProgress(0)
    setAnalysis([])

    const waevRepos = [
      'waev-dash', 'api', 'waev-market', 'ethSmartContracts', 'access-server',
      'access-core', 'middleware', 'infrastructure', 'access-client', 'stream-api'
    ]

    const results: RepositoryAnalysis[] = []

    for (let i = 0; i < waevRepos.length; i++) {
      const repoName = waevRepos[i]
      setCurrentRepo(repoName)
      
      try {
        // Try to get zip from localStorage
        const zipData = localStorage.getItem(`${repoName}-main.zip`) || 
                       localStorage.getItem(`${repoName}.zip`) ||
                       localStorage.getItem(repoName)
        
        if (zipData) {
          const repoAnalysis = await analyzeZipFile(zipData, repoName)
          results.push(repoAnalysis)
        } else {
          // Create placeholder analysis for missing repos
          results.push({
            name: repoName,
            readme: 'Repository not found in localStorage',
            dependencies: [],
            devDependencies: [],
            scripts: [],
            description: 'Repository not available',
            version: 'Unknown',
            hasDockerfile: false,
            hasDockerCompose: false,
            hasGitHubActions: false,
            techStack: [],
            architecture: [],
            deploymentInfo: [],
            issues: ['Repository not found in localStorage'],
            recommendations: ['Upload repository zip file to localStorage']
          })
        }
      } catch (error) {
        results.push({
          name: repoName,
          readme: `Error analyzing repository: ${error}`,
          dependencies: [],
          devDependencies: [],
          scripts: [],
          description: 'Error during analysis',
          version: 'Unknown',
          hasDockerfile: false,
          hasDockerCompose: false,
          hasGitHubActions: false,
          techStack: [],
          architecture: [],
          deploymentInfo: [],
          issues: [`Analysis failed: ${error}`],
          recommendations: ['Check zip file integrity']
        })
      }

      setProgress((i + 1) / waevRepos.length * 100)
      setAnalysis([...results])
      
      // Small delay for UI updates
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    setIsAnalyzing(false)
    setCurrentRepo('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Repository Analyzer</h2>
        <p className="text-gray-600 mb-6">
          Analyze READMEs and understand the architecture of your WaevLabs repositories
        </p>
        
        <button
          onClick={analyzeAllRepositories}
          disabled={isAnalyzing}
          className="btn-primary flex items-center space-x-2"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          <span>{isAnalyzing ? 'Analyzing...' : 'Analyze All Repositories'}</span>
        </button>
      </div>

      {/* Progress */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                Analyzing: {currentRepo}
              </h3>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-waev-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Analysis Results */}
      {analysis.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Repository List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Repositories</h3>
            {analysis.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card cursor-pointer transition-all duration-200 ${
                  selectedRepo?.name === repo.name ? 'ring-2 ring-waev-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedRepo(repo)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{repo.name}</h4>
                    <p className="text-sm text-gray-600">{repo.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {repo.issues.length > 0 && (
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                    )}
                    {repo.techStack.length > 0 && (
                      <CodeBracketIcon className="w-5 h-5 text-blue-500" />
                    )}
                    {repo.readme && !repo.readme.includes('not found') && (
                      <DocumentTextIcon className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {repo.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                  {repo.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      +{repo.techStack.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Repository Details */}
          {selectedRepo && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedRepo.name}
              </h3>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">{selectedRepo.description}</p>
                </div>

                {/* Tech Stack */}
                {selectedRepo.techStack.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRepo.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-waev-100 text-waev-800 text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Architecture */}
                {selectedRepo.architecture.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Architecture</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRepo.architecture.map(arch => (
                        <span key={arch} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {arch}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dependencies */}
                {selectedRepo.dependencies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Dependencies</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedRepo.dependencies.slice(0, 5).map(dep => (
                        <span key={dep} className="px-2 py-1 bg-gray-100 text-xs rounded">
                          {dep}
                        </span>
                      ))}
                      {selectedRepo.dependencies.length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                          +{selectedRepo.dependencies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Scripts */}
                {selectedRepo.scripts.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Available Scripts</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRepo.scripts.map(script => (
                        <span key={script} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {script}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deployment Info */}
                {selectedRepo.deploymentInfo.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Deployment</h4>
                    <div className="space-y-1">
                      {selectedRepo.deploymentInfo.map(info => (
                        <div key={info} className="flex items-center space-x-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{info}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Issues */}
                {selectedRepo.issues.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Issues</h4>
                    <div className="space-y-1">
                      {selectedRepo.issues.map(issue => (
                        <div key={issue} className="flex items-center space-x-2">
                          <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-600">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {selectedRepo.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                    <div className="space-y-1">
                      {selectedRepo.recommendations.map(rec => (
                        <div key={rec} className="flex items-center space-x-2">
                          <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* README Preview */}
                {selectedRepo.readme && !selectedRepo.readme.includes('not found') && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">README Preview</h4>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                        {selectedRepo.readme.substring(0, 500)}
                        {selectedRepo.readme.length > 500 && '...'}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
} 