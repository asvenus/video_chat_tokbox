class RoomsController < ApplicationController
  before_action :config_opentok, only: %i(create show)
  def index
    @rooms = Room.all
  end

  def new
    @room = Room.new
  end

  def create
    session = @opentok.create_session
    params[:room][:session_id] = session.session_id
    @room = Room.new(room_params)
    if @room.save
      redirect_to room_path(@room)
    else
      render :new
    end
  end

  def show
    @room = Room.find(params[:id])
    @session_id = @room.session_id
    @token = @opentok.generate_token @session_id
  end

  private
  def config_opentok
    if @opentok.nil?
     @opentok = OpenTok::OpenTok.new 45295772, "84020cdc8d90819250011e21da34048400d7248c"
    end
  end

  def room_params
    params.require(:room).permit(:name, :session_id)
  end
end
