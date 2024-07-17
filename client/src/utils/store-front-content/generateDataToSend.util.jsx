import DOMPurify from 'dompurify'

export const generateDataToSend = (pageId, data, content) => {
    switch (pageId) {
        case '1':
            return {
                'header': [
                    {
                        'title': DOMPurify.sanitize(data['header-title']),
                        'subtitle': DOMPurify.sanitize(data['header-subtitle']),
                    }
                ],
                'main': [
                    ...content.homeContent.main.map((section, index) => ({
                        'title': DOMPurify.sanitize(data[`main-${index}-title`] || section.title),
                        'subtitle': DOMPurify.sanitize(data[`main-${index}-subtitle`] || section.subtitle),
                        'text': section.text.map((text, i) => DOMPurify.sanitize(data[`main-${index}-text-${i}`] || text))
                    }))
                ],
                'footer': [
                    {
                        'text': [
                            DOMPurify.sanitize(data['footer-text-0']),
                            DOMPurify.sanitize(data['footer-text-1']),
                        ]
                    }
                ],
                'reviews': [
                    ...content.homeContent.reviews.map((review, index) => ({
                        'text': DOMPurify.sanitize(data[`review-${index}-text`] || review.text),
                        'author': DOMPurify.sanitize(data[`review-${index}-author`] || review.author),
                    }))
                ],
            }
        case '2':
            return {
                'header': [
                    {
                        'title': DOMPurify.sanitize(data['header-title']),
                        'subtitle': DOMPurify.sanitize(data['header-subtitle']),
                    }
                ],
                'main': [
                    {
                        'title': DOMPurify.sanitize(data['main-title']),
                        'text': [
                            DOMPurify.sanitize(data['text-0']),
                            DOMPurify.sanitize(data['text-1']),
                            DOMPurify.sanitize(data['text-2']),
                            DOMPurify.sanitize(data['text-3']),
                            DOMPurify.sanitize(data['text-4']),
                        ],
                    }
                ],
                'services': [
                    ...content.serviceContent.services.map((service, index) => ({
                        'title': DOMPurify.sanitize(data[`service-${index}-title`] || service.title),
                        'time': DOMPurify.sanitize(data[`service-${index}-time`] || service.time),
                        'text': DOMPurify.sanitize(data[`service-${index}-text`] || service.text),
                    }))
                ],
            }
        case '3':
            return {
                'header': [
                    {
                        'title': DOMPurify.sanitize(data['header-title']),
                    }
                ],
                'main': [
                    ...content.priceContent.main.map((section, index) => ({
                        'title': DOMPurify.sanitize(data[`main-${index}-title`] || section.title),
                        'duration': DOMPurify.sanitize(data[`main-${index}-duration`] || section.duration),
                        'price': DOMPurify.sanitize(data[`main-${index}-price`] || section.price),
                    }))
                ],
                'more': [
                    {
                        'title': DOMPurify.sanitize(data['more-0-title']),
                        'price': DOMPurify.sanitize(data['more-0-price']),
                    },
                    {
                        'text': DOMPurify.sanitize(data['more-1-text']),
                        'choices': [
                            DOMPurify.sanitize(data['choice-0']),
                            DOMPurify.sanitize(data['choice-1']),
                            DOMPurify.sanitize(data['choice-2']),
                        ],
                        'more': DOMPurify.sanitize(data['more-1-more']),
                    }
                ],
            }
        case '4':
            return {
                'main': [
                    {
                        'title': DOMPurify.sanitize(data['title']),
                        'text': [
                            DOMPurify.sanitize(data['text-0']),
                            DOMPurify.sanitize(data['text-1']),
                            DOMPurify.sanitize(data['text-2']),
                            DOMPurify.sanitize(data['text-3']),
                        ],
                    }
                ]
            }
        case '5':
            return {
                'header': [
                    {
                        'title': DOMPurify.sanitize(data['header-title']),
                    }
                ],
                'main': [
                    ...content.certificationContent.main.map((section, index) => ({
                        'title': DOMPurify.sanitize(data[`main-${index}-title`] || section.title),
                        'text': section.text.map((text, i) => DOMPurify.sanitize(data[`main-${index}-text-${i}`] || text))
                    }))
                ],
            }
        case '6':
            return {
                'header': [
                    {
                        'title': DOMPurify.sanitize(data['header-title']),
                        'name': DOMPurify.sanitize(data['header-name']),
                        'address': DOMPurify.sanitize(data['header-address']),
                        'zip': DOMPurify.sanitize(data['header-zip']),
                        'city': DOMPurify.sanitize(data['header-city']),
                        'phone': DOMPurify.sanitize(data['header-phone']),
                        'email': DOMPurify.sanitize(data['header-email']),
                    }
                ],
            }
        default:
            return null
    }
}