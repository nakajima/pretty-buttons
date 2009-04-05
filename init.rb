module PrettyButtons
  def pretty_button(*args, &block)
    options = args.last.is_a?(Hash) ? args.pop : {}
    content = args.shift
    href    = args.shift || '#'

    options[:href] = href
    options[:class] = options[:class].to_s.split(/\s+/) || []
    options[:class] << 'is-button'
    options[:class] = options[:class].join(' ')

    builder = Builder::XmlMarkup.new()

    # Wraps everything up in an anchor tag
    builder.a(options) do |xml|
      # Fakes the gradient
      xml.b('', :class => 'gradient')

      # The content
      xml.span(content)

      # Fakes the round corners
      xml.i('', :class => 'top left')
      xml.i('', :class => 'top right')
      xml.i('', :class => 'bottom left')
      xml.i('', :class => 'bottom right')
    end
  end
end
