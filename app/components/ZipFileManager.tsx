'use client'

import { useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

interface ZipFileManagerProps {
  onFileExtracted: (fileName: string, content: any) => void
  onError: (error: string) => void
}

export default function ZipFileManager({ onFileExtracted, onError }: ZipFileManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const extractZipFromLocalStorage = async (key: string) => {
    try {
      setIsProcessing(true)
      
      // Get zip file from localStorage
      const zipData = localStorage.getItem(key)
      if (!zipData) {
        throw new Error(`No zip file found with key: ${key}`)
      }

      // Parse the zip data
      const zip = new JSZip()
      const zipContent = await zip.loadAsync(zipData)
      
      // Extract all files
      const extractedFiles: { [key: string]: any } = {}
      
      for (const [fileName, file] of Object.entries(zipContent.files)) {
        if (!file.dir) {
          const content = await file.async('text')
          extractedFiles[fileName] = content
          onFileExtracted(fileName, content)
        }
      }
      
      return extractedFiles
    } catch (error) {
      onError(`Failed to extract zip file: ${error}`)
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const saveZipToLocalStorage = async (fileName: string, zipBlob: Blob) => {
    try {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Data = reader.result as string
        localStorage.setItem(fileName, base64Data)
      }
      reader.readAsDataURL(zipBlob)
    } catch (error) {
      onError(`Failed to save zip file to localStorage: ${error}`)
    }
  }

  const downloadZip = async (fileName: string, content: any) => {
    try {
      const zip = new JSZip()
      
      // Add content to zip
      if (typeof content === 'object') {
        Object.entries(content).forEach(([filePath, fileContent]) => {
          zip.file(filePath, fileContent as string)
        })
      } else {
        zip.file('content.txt', content)
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      saveAs(zipBlob, `${fileName}.zip`)
    } catch (error) {
      onError(`Failed to download zip file: ${error}`)
    }
  }

  const listLocalStorageZips = () => {
    const zips: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.endsWith('.zip')) {
        zips.push(key)
      }
    }
    return zips
  }

  return {
    extractZipFromLocalStorage,
    saveZipToLocalStorage,
    downloadZip,
    listLocalStorageZips,
    isProcessing
  }
} 