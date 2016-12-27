# encoding: utf-8

class PhotoUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  if Rails.env.production?
    storage :fog
    BASE_PATH = 'photos/'
  else
    storage :file
    #BASE_PATH = 'uploads/'
    BASE_PATH = 'photos/'
  end

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    base = BASE_PATH
    path = "#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    base + path
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    "/assets/default.png"
  end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  version :thumb do
    process resize_to_fill: [240, 125]
  end

  version :display do
    process :choose_resize!
    process :watermark
  end

  version :preview do
    process resize_to_fill: [310, 165]
  end

  version :headline do
    process resize_to_fill: [1200, 500]
  end

  version :square do
    process resize_to_fill: [220, 220]
  end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
   def extension_white_list
     %w(jpg jpeg gif png bmp tiff)
   end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

  protected

  def watermark
    manipulate! do |img|
      spacer = 10
      logo = Magick::Image.read("#{Rails.root}/app/assets/images/watermark.png").first
      x = (img.columns - logo.columns) - spacer
      #y = (img.rows - logo.rows) - spacer
      y = spacer
      img = img.composite(logo, Magick::NorthWestGravity, x, y, Magick::OverCompositeOp)
    end
  end

  def choose_resize!
    img = Magick::Image.read(current_path)
    width = img[0].columns
    height = img[0].rows

    if width > height
      # original is landscape
      if width > 1000 || height > 800
        resize_to_fit(1000, 800)
      end
    else
      # original is portrait
      if width > 600 || height > 850
        resize_to_fit(600, 850)
      end
    end

    img
  end
end

