import { Flex, Upload, notification } from 'antd'
import { useState } from 'react'
import * as S from './AdminPage.styled.ts'
import axios from 'axios'

export function AdminPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  function handleFileChange(info: any) {
    if (info.fileList.length > 0) {
      setFile(info.fileList[0].originFileObj as File)
    }
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        'http://shmyaks.ru/api/v1/upload-csv',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (response.data) {
        notification.success({
          message: 'Файл успешно загружен',
        })
      }
    } catch (error) {
      console.error('Error during load file:', error)
      notification.error({
        message: 'Не удалось загрузить файл',
      })
    } finally {
      setUploading(false)
      setFile(null)
    }
  }

  return (
    <Flex vertical gap={32}>
      <Flex vertical justify='space-between' gap={4}>
        <S.UploadTitle>Загрузка файла</S.UploadTitle>
        <S.UploadContainer align='center' justify='center'>
          {!file && (
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              showUploadList={false}
            >
              <S.StyledButton>Загрузить файл</S.StyledButton>
            </Upload>
          )}
          {file && (
            <>
              <S.FileItem>{file.name}</S.FileItem>
              <S.StyledButton onClick={handleUpload} loading={uploading}>
                {uploading ? 'Загрузка...' : 'Отправить файл'}
              </S.StyledButton>
            </>
          )}
        </S.UploadContainer>
      </Flex>
    </Flex>
  )
}
