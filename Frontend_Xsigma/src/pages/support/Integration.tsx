import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, AlertCircle, Database, Cloud, Shield, Code } from 'lucide-react';

const Integration: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState('bloomberg');

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const integrationGuides = [
    {
      id: 'bloomberg',
      name: 'Bloomberg Terminal',
      description: 'Integrate XSigma Enhanced AAD with Bloomberg Terminal for real-time market data',
      icon: <Database className="w-8 h-8" />,
      difficulty: 'Intermediate',
      duration: '2-3 hours',
      steps: [
        {
          title: 'Bloomberg API Setup',
          description: 'Configure Bloomberg API access and authentication',
          details: 'Install Bloomberg API libraries and configure authentication credentials for your Bloomberg Terminal access.',
          code: `# Install Bloomberg Python API
pip install blpapi

# Configure authentication
import blpapi
session = blpapi.Session()
session.start()
session.openService('//blp/refdata')`
        },
        {
          title: 'XSigma Client Configuration',
          description: 'Initialize XSigma client with Enhanced AAD capabilities',
          details: 'Set up XSigma client with proper authentication and Enhanced AAD configuration.',
          code: `import xsigma

# Initialize XSigma client
client = xsigma.Client(
    api_key="your_api_key",
    enhanced_aad=True,
    environment="production"
)`
        },
        {
          title: 'Data Pipeline Setup',
          description: 'Create data pipeline between Bloomberg and XSigma',
          details: 'Establish real-time data flow from Bloomberg Terminal to XSigma calculations.',
          code: `# Create data pipeline
pipeline = xsigma.Pipeline()
pipeline.add_source(bloomberg_session)
pipeline.add_processor(xsigma.processors.CVACalculator)
pipeline.start()`
        },
        {
          title: 'Real-time Processing',
          description: 'Implement real-time CVA calculations with market data updates',
          details: 'Configure real-time processing of market data updates for continuous CVA calculations.',
          code: `# Real-time CVA updates
@pipeline.on_market_data_update
def calculate_cva(market_data):
    result = client.cva.calculate(
        market_data=market_data,
        enhanced_aad=True
    )
    return result`
        }
      ]
    },
    {
      id: 'refinitiv',
      name: 'Refinitiv Eikon',
      description: 'Connect XSigma with Refinitiv Eikon for comprehensive market analytics',
      icon: <Cloud className="w-8 h-8" />,
      difficulty: 'Intermediate',
      duration: '2-4 hours',
      steps: [
        {
          title: 'Refinitiv API Configuration',
          description: 'Set up Refinitiv Eikon API access and data streams',
          details: 'Configure Refinitiv Eikon API credentials and establish data stream connections.',
          code: `import refinitiv.dataplatform as rdp

# Configure Refinitiv session
rdp.open_platform_session(
    app_key="your_app_key",
    grant=rdp.GrantPassword(
        username="your_username",
        password="your_password"
    )
)`
        },
        {
          title: 'Market Data Integration',
          description: 'Integrate Refinitiv market data with XSigma calculations',
          details: 'Set up market data feeds from Refinitiv for XSigma Enhanced AAD calculations.',
          code: `# Market data integration
market_data = rdp.get_data(
    universe=['EUR=', 'GBP=', 'JPY='],
    fields=['BID', 'ASK', 'LAST']
)

# Process with XSigma
result = client.process_market_data(market_data)`
        }
      ]
    },
    {
      id: 'murex',
      name: 'Murex Platform',
      description: 'Enterprise integration with Murex trading and risk management platform',
      icon: <Shield className="w-8 h-8" />,
      difficulty: 'Advanced',
      duration: '1-2 weeks',
      steps: [
        {
          title: 'Murex Connector Setup',
          description: 'Configure Murex MxML connector for XSigma integration',
          details: 'Set up Murex MxML connector to enable data exchange with XSigma Enhanced AAD engine.',
          code: `<!-- Murex MxML Configuration -->
<MxMLConnector>
    <Connection>
        <Host>xsigma-api.murex.local</Host>
        <Port>8443</Port>
        <SSL>true</SSL>
    </Connection>
    <Authentication>
        <Type>OAuth2</Type>
        <ClientId>murex_client</ClientId>
    </Authentication>
</MxMLConnector>`
        },
        {
          title: 'Trade Data Mapping',
          description: 'Map Murex trade data to XSigma calculation formats',
          details: 'Configure data mapping between Murex trade structures and XSigma API formats.',
          code: `# Trade data mapping
def map_murex_trade(murex_trade):
    return {
        'trade_id': murex_trade.trade_id,
        'instrument_type': murex_trade.product_type,
        'notional': murex_trade.notional_amount,
        'maturity': murex_trade.maturity_date,
        'counterparty': murex_trade.counterparty_id
    }`
        }
      ]
    },
    {
      id: 'custom',
      name: 'Custom Integration',
      description: 'Build custom integrations using XSigma REST API and SDKs',
      icon: <Code className="w-8 h-8" />,
      difficulty: 'Beginner to Advanced',
      duration: '1-8 hours',
      steps: [
        {
          title: 'API Authentication',
          description: 'Set up secure API authentication for your custom application',
          details: 'Implement OAuth 2.0 authentication flow for secure API access.',
          code: `# Custom API authentication
import requests

def authenticate():
    response = requests.post(
        'https://api.xsigma.co.uk/v1/auth/token',
        json={
            'client_id': 'your_client_id',
            'client_secret': 'your_client_secret',
            'grant_type': 'client_credentials'
        }
    )
    return response.json()['access_token']`
        },
        {
          title: 'Custom Data Processing',
          description: 'Implement custom data processing logic for your specific use case',
          details: 'Create custom data processing workflows tailored to your business requirements.',
          code: `# Custom processing workflow
class CustomProcessor:
    def __init__(self, xsigma_client):
        self.client = xsigma_client
    
    def process_portfolio(self, portfolio_data):
        # Custom business logic
        processed_data = self.transform_data(portfolio_data)
        
        # XSigma calculation
        result = self.client.calculate(processed_data)
        
        return self.format_output(result)`
        }
      ]
    }
  ];

  const integrationBenefits = [
    {
      title: 'Seamless Data Flow',
      description: 'Automated data synchronization between systems',
      icon: <Database className="w-6 h-6" />
    },
    {
      title: 'Real-time Processing',
      description: 'Live market data processing with Enhanced AAD',
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-grade security and compliance standards',
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: 'Scalable Architecture',
      description: 'Cloud-native design that scales with demand',
      icon: <Cloud className="w-6 h-6" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Integration Guides - XSigma Platform Integration | Enhanced AAD Technology</title>
        <meta name="description" content="Step-by-step integration guides for XSigma Enhanced AAD technology. Bloomberg Terminal, Refinitiv Eikon, Murex platform, and custom API integrations." />
        <meta name="keywords" content="XSigma integration guides, Bloomberg integration, Refinitiv integration, Murex integration, Enhanced AAD API integration" />
        <link rel="canonical" href="https://xsigma.co.uk/support/integration" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="/" className="text-xsigma-navy hover:text-xsigma-teal transition-colors">Home</a>
              <span className="text-gray-400">/</span>
              <a href="/support" className="text-xsigma-navy hover:text-xsigma-teal transition-colors">Support</a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Integration Guides</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-xsigma-navy via-xsigma-navy to-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Integration <span className="text-xsigma-teal">Guides</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Step-by-step guides for integrating XSigma's Enhanced AAD technology 
                with leading financial platforms and custom applications.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Integration Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Integration Benefits</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                XSigma's integration capabilities enable seamless connectivity with your existing 
                financial technology infrastructure.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {integrationBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-xsigma-teal">{benefit.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-xsigma-navy mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Integration Guides */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Platform Integration Guides</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose your integration platform and follow our comprehensive step-by-step guides 
                to connect with XSigma's Enhanced AAD technology.
              </p>
            </motion.div>

            {/* Guide Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {integrationGuides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    selectedGuide === guide.id
                      ? 'bg-xsigma-navy text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {guide.icon}
                  <span>{guide.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Guide Details */}
            {integrationGuides.map((guide) => (
              selectedGuide === guide.id && (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        <div className="text-xsigma-teal">{guide.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-xsigma-navy">{guide.name}</h3>
                        <p className="text-gray-600">{guide.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-3 py-1 rounded-full font-semibold ${
                          guide.difficulty === 'Beginner to Advanced' || guide.difficulty === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : guide.difficulty === 'Advanced'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {guide.difficulty}
                        </span>
                        <span className="text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {guide.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {guide.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="border-l-4 border-xsigma-teal pl-6">
                        <div className="flex items-start">
                          <div className="bg-xsigma-teal text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 -ml-10">
                            {stepIndex + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-xsigma-navy mb-2">{step.title}</h4>
                            <p className="text-gray-600 mb-3">{step.description}</p>
                            <p className="text-gray-700 mb-4">{step.details}</p>
                            {step.code && (
                              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                                <code>{step.code}</code>
                              </pre>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Need Help?</h4>
                        <p className="text-blue-800 text-sm">
                          Our integration specialists are available to assist with complex integrations. 
                          Contact our technical support team for personalized guidance.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Need Integration Support?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Our technical team provides comprehensive integration support to ensure 
                seamless connectivity with your existing systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/support/technical"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Contact Technical Support
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/support/professional"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  Professional Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Integration;
