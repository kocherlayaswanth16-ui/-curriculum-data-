import os
import uuid
from werkzeug.utils import secure_filename
from flask import current_app

class FileHandler:
    @staticmethod
    def allowed_file(filename, allowed_extensions):
        """Check if file extension is allowed"""
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in allowed_extensions

    @staticmethod
    def save_file(file, original_filename):
        """Save uploaded file with secure filename"""
        # Generate unique filename
        file_extension = original_filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4().hex}.{file_extension}"

        # Create upload directory if it doesn't exist
        upload_dir = current_app.config['UPLOAD_FOLDER']
        os.makedirs(upload_dir, exist_ok=True)

        # Save file
        file_path = os.path.join(upload_dir, unique_filename)
        file.save(file_path)

        return file_path

    @staticmethod
    def delete_file(file_path):
        """Delete file from filesystem"""
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                return True
        except Exception:
            pass
        return False

    @staticmethod
    def get_file_info(file_path):
        """Get file information"""
        if not os.path.exists(file_path):
            return None

        stat = os.stat(file_path)
        return {
            'size': stat.st_size,
            'modified': stat.st_mtime,
            'exists': True
        }

    @staticmethod
    def extract_text_from_pdf(file_path):
        """Extract text from PDF file"""
        try:
            import PyPDF2

            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""

                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"

                return text.strip()
        except Exception as e:
            raise Exception(f"Failed to extract text from PDF: {str(e)}")

    @staticmethod
    def extract_text_from_docx(file_path):
        """Extract text from DOCX file"""
        try:
            from docx import Document

            doc = Document(file_path)
            text = ""

            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"

            return text.strip()
        except Exception as e:
            raise Exception(f"Failed to extract text from DOCX: {str(e)}")

    @staticmethod
    def extract_text_from_file(file_path):
        """Extract text from file based on extension"""
        if not os.path.exists(file_path):
            raise Exception("File does not exist")

        file_extension = file_path.rsplit('.', 1)[1].lower()

        if file_extension == 'pdf':
            return FileHandler.extract_text_from_pdf(file_path)
        elif file_extension == 'docx':
            return FileHandler.extract_text_from_docx(file_path)
        elif file_extension == 'doc':
            # For .doc files, we'd need additional libraries like python-docx or antiword
            raise Exception("DOC file format not supported. Please convert to DOCX or PDF.")
        else:
            raise Exception(f"Unsupported file format: {file_extension}")