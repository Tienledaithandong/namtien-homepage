import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import thumbYouTube from '../public/images/links/youtube.png'
import thumbInkdrop from '../public/images/works/inkdrop_eyecatch.png'
import Image from 'next/image'

const Home = () => (
  <Layout>
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hello, I&apos;m a Computer Science student based in Ho Chi Minh City!
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Le Nam Tien
          </Heading>
          <p>Computer Science Student ( Coder / AI Enthusiast / Tech Explorer )</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src="/images/profile.jpg"
              alt="Profile image"
              width="100"
              height="100"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          Le Nam Tien is a Computer Science student at Ho Chi Minh City University
          of Technology (HCMUT) with a passion for competitive programming and AI
          research. He has a strong interest in model quantization, microcontroller
          programming, and building practical solutions with code. When not coding,
          he enjoys participating in programming competitions like Codeforces and
          AtCoder. He is actively conducting AI research and exploring advanced
          techniques in machine learning and optimization.
        </Paragraph>
        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/works"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            My portfolio
          </Button>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
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
          I ♥
        </Heading>
        <Paragraph>
          Competitive Programming ({' '}
          <Link href="https://codeforces.com" target="_blank">
            Codeforces
          </Link>
          , {' '}
          <Link href="https://atcoder.jp" target="_blank">
            AtCoder
          </Link>
          ), Model Quantization, Microcontrollers, Machine Learning, Open Source
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
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

        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            href="https://codeforces.com"
            title="Codeforces"
            thumbnail={thumbYouTube}
          >
            Competitive Programming Platform
          </GridItem>
          <GridItem
            href="https://atcoder.jp/"
            title="AtCoder"
            thumbnail={thumbInkdrop}
          >
            Japanese Programming Contest
          </GridItem>
        </SimpleGrid>

        <Heading as="h3" variant="section-title">
          Contact
        </Heading>
        <p>
          Feel free to reach out if you want to collaborate or discuss AI, competitive
          programming, and tech innovations.
        </p>

        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="mailto:your.email@example.com"
            scroll={false}
            leftIcon={<EmailIcon />}
            colorScheme="teal"
          >
            Send me an email
          </Button>
        </Box>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
