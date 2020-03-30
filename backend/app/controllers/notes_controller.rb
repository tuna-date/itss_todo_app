class NotesController < ApplicationController
  before_action :authorize_request
  before_action :find_note, only: [:show, :update, :delete]

  def index
    @notes = @current_user.notes.paginate(page: newfeed_params[:page], per_page: 10).order('created_at DESC')
    render json: @notes, status: :ok
  end

  def show
    render json: @note, status: :ok
  end

  def create
    note = @current_user.notes.build(title: params[:title], 
                                    description: params[:description])
    if note.save
        render json: note, status: :ok
    else
        render json: { isOk: false }, status: :not_found
    end
  end

  def update
    if @current_user.notes.include?(@note)
        @note.update(title: params[:title],
                     description: params[:description])
        render json: @note, status: :ok
    else
        render json: { isOk: false }, status: :not_found
    end
  end

  def delete
    if @current_user.notes.include?(@note)
      @note.destroy
      render json: { isOk: true }, status: :ok
    else
        render json: { isOk: false }, status: :not_found
    end
  end

  private

  def newfeed_params
    params.permit(:page)
  end

  def note_detail_params
    params.permit(:note_id)
  end

  def find_note
    @note = Note.find(params[:note_id])
  rescue ActiveRecord::RecordNotFound
      render json: { errors: 'Note not found' }, status: :not_found
  end
end
