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
    binding.pry
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
    @tok_token = @opentok.generate_token @room.session_id
  end

  private
  def config_opentok
    if @opentok.nil?
     @opentok = OpenTok::OpenTok.new 45281572, "cfe31974ff35ceee061ae00a0c0b46b6f37c0189"
    end
  end

  def room_params
    params.require(:room).permit(:name, :session_id)
  end
end
