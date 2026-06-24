import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  List,
  ListItem,
  useColorModeValue,
  HStack,
  Badge,
  VStack
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const DynamicCodeRain = dynamic(() => import('../components/code-rain'), {
  ssr: false
})

const Home = () => (
  <Layout>
    <Box position="relative" pb={8}>
      <DynamicCodeRain />
    </Box>

    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={4}
        textAlign="center"
        bg={useColorModeValue('teal.50', 'rgba(0, 128, 128, 0.1)')}
        borderLeft="4px solid"
        borderColor="teal"
        css={{
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0, 128, 128, 0.2)'
        }}
      >
        <code style={{ fontSize: '14px', fontWeight: 'bold' }}>
          $ ./welcome.sh
        </code>
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
          &gt; Hello, I&apos;m a Computer Science student with a passion for code
        </p>
      </Box>

      <Box display={{ md: 'flex' }} mb={8}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title" mb={2}>
            <code>&lt;namtiene /&gt;</code>
          </Heading>
          <HStack spacing={2} mb={2}>
            <Badge colorScheme="teal" variant="solid">Coder</Badge>
            <Badge colorScheme="blue" variant="solid">AI Enthusiast</Badge>
            <Badge colorScheme="purple" variant="solid">Tech Explorer</Badge>
          </HStack>
          <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '10px' }}>
            // Computer Science Student @ HCMUT
          </p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="teal"
            borderWidth={3}
            borderStyle="solid"
            w="120px"
            h="120px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
            boxShadow="0 0 20px rgba(0, 128, 128, 0.3)"
          >
            <Image
              src="/images/profile.jpg"
              alt="Profile image"
              width="120"
              height="120"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          <code>// About()</code>
        </Heading>
        <Paragraph>
          Computer Science student at Ho Chi Minh City University of Technology (HCMUT).
          Passionate about competitive programming, AI research, and building practical
          solutions with code. Interested in model quantization, microcontrollers, and
          machine learning optimization. Always exploring new technologies and pushing boundaries.
        </Paragraph>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          <code>// Timeline()</code>
        </Heading>
        <BioSection>
          <BioYear>2024</BioYear>
          Started Bachelor&apos;s Degree in Computer Science at HCMUT
        </BioSection>
        <BioSection>
          <BioYear>2025</BioYear>
          Participated in HCMC AI Challenge and Bach Khoa Code Challenge
        </BioSection>
        <BioSection>
          <BioYear>2026</BioYear>
          Conducting research in AI and joined GenAI4E program
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          <code>// Skills ♥</code>
        </Heading>
        <Paragraph>
          <Badge colorScheme="cyan" mr={2}>Competitive Programming</Badge>
          <Badge colorScheme="purple" mr={2}>AI/ML</Badge>
          <Badge colorScheme="blue" mr={2}>Microcontrollers</Badge>
          <Badge colorScheme="green" mr={2}>Model Optimization</Badge>
          <Badge colorScheme="orange">Open Source</Badge>
        </Paragraph>
        <Paragraph>
          Passionate about{' '}
          <Link href="https://codeforces.com" target="_blank" color="teal" fontWeight="bold">
            Codeforces
          </Link>
          {' '}and{' '}
          <Link href="https://atcoder.jp" target="_blank" color="teal" fontWeight="bold">
            AtCoder
          </Link>
          . Always learning and improving my problem-solving skills.
        </Paragraph>
      </Section>

      <Section delay={0.4}>
        <Heading as="h3" variant="section-title">
          <code>// Connect()</code>
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/yourgithub" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @yourgithub
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/yourtwitter" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoTwitter />}
              >
                @yourtwitter
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://instagram.com/yourinstagram" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoInstagram />}
              >
                @yourinstagram
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>

      <Section delay={0.5}>
        <Heading as="h3" variant="section-title">
          <code>// Get In Touch</code>
        </Heading>
        <Box
          p={4}
          borderRadius="lg"
          bg={useColorModeValue('blue.50', 'rgba(0, 0, 255, 0.05)')}
          borderLeft="4px solid"
          borderColor="blue"
          mb={4}
        >
          <p>Feel free to reach out if you want to collaborate or discuss AI, competitive programming, and tech innovations.</p>
        </Box>

        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="mailto:tiendangstudy312@gmail.com"
            scroll={false}
            leftIcon={<EmailIcon />}
            colorScheme="teal"
            size="lg"
          >
            Send me an email
          </Button>
        </Box>
      </Section>

      <Box
        mt={12}
        p={6}
        borderRadius="lg"
        bg={useColorModeValue('gray.50', 'rgba(128, 128, 128, 0.1)')}
        borderLeft="4px solid"
        borderColor="gray"
        textAlign="center"
      >
        <code style={{ fontSize: '12px' }}>
          echo "Thanks for visiting! 🚀" | ./spread_the_word.sh
        </code>
      </Box>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
