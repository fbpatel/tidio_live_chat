from odoo import fields, models

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    tidio_script = fields.Char('Tidio Script URL',
        config_parameter='tidio_scrip_url',
        help="Get tidio script url from https://www.tidiochat.com/panel/channels/widget/integration")
