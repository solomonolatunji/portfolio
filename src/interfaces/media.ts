export interface Media {
  id: number;
  mediable_type: string;
  mediable_id: number;
  file_name: string;
  file_type: string;
  public_id: string;
  url: string;
  width: number;
  height: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface MediaPagination {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface MediaResponse {
  status: boolean;
  message: string;
  data: Media[];
  meta: MediaPagination;
}

export interface MediaFilters {
  per_page?: number;
  mediable_type?: string;
  is_featured?: boolean;
  file_type?: string;
  page?: number;
}

export interface UploadMediaResponse {
  status: boolean;
  message: string;
  data: Media;
}
