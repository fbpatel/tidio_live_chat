# -*- coding: utf-8 -*-
{
    'name': "tidio_live_chat",

    'summary': """
        Enable Tidio Live Chat support""",

    'description': """
        Enable Tidio Live Chat support

Tidio Chat
A unique Live Chat solution that will significantly improve conversion on your website! 

Tidio Automation
Marketing Automation solution that allows you to automate processes on your website / web store in a really simple way.

    """,

    'author': "Odoosoft",
    'email': 'support@odoosoft.com',
    'website': "https://odoosoft.com",
    'maintainer': 'Odoosoft',
    'category': 'Discuss',
    'version': '1.0',
    'depends': ['base_setup'],
    'data': [
        'views/tidio_chat_assets.xml',
        'views/tidio_chat_config.xml',
    ],
}
