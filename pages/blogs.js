import { Container, Heading, SimpleGrid, Box, useColorModeValue, Badge, HStack, VStack, Text, Link } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import dynamic from 'next/dynamic'

const DynamicCodeRain = dynamic(() => import('../components/code-rain'), {
  ssr: false
})

const BlogCard = ({ title, excerpt, date, tags, href }) => (
  <Link href={href} _hover={{ textDecoration: 'none' }} isExternal>
    <Box
      p={5}
      borderRadius="lg"
      borderLeft="4px solid"
      borderColor="teal"
      bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.100')}
      _hover={{
        boxShadow: '0 0 20px rgba(0, 128, 128, 0.3)',
        transform: 'translateY(-2px)',
        transition: 'all 0.3s'
      }}
      cursor="pointer"
      transition="all 0.3s"
    >
      <Heading as="h3" size="md" mb={2} color="teal">
        {title}
      </Heading>
      <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} mb={3}>
        {excerpt}
      </Text>
      <HStack spacing={2} mb={3}>
        {tags.map((tag) => (
          <Badge key={tag} colorScheme="teal" variant="subtle" fontSize="xs">
            {tag}
          </Badge>
        ))}
      </HStack>
      <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.500')}>
        {date}
      </Text>
    </Box>
  </Link>
)

const Blogs = () => {
  const blogs = [
    {
      title: 'Hành trình tối ưu hóa mô hình AI với INT8 Quantization',
      excerpt: 'Chia sẻ kinh nghiệm thực tế về kỹ thuật INT8 quantization để tối ưu hóa mô hình machine learning',
      date: '2026-06-23',
      tags: ['AI', 'Optimization', 'Machine Learning', 'Quantization'],
      href: '/blogs/ai-model-quantization'
    },
    {
      title: 'Getting Started with Competitive Programming on Codeforces',
      excerpt: 'Tips and tricks for beginners to master competitive programming and improve your problem-solving skills',
      date: 'Coming Soon',
      tags: ['Competitive Programming', 'Codeforces', 'Algorithm'],
      href: '#'
    },
    {
      title: 'Microcontroller Projects: Building IoT Solutions',
      excerpt: 'Practical guide to building IoT solutions with microcontrollers and embedded systems',
      date: 'Coming Soon',
      tags: ['IoT', 'Microcontroller', 'Embedded Systems'],
      href: '#'
    },
    {
      title: 'Deep Dive into Model Architecture Optimization',
      excerpt: 'Advanced techniques for optimizing neural network architectures for production deployment',
      date: 'Coming Soon',
      tags: ['Deep Learning', 'Architecture', 'Performance'],
      href: '#'
    }
  ]

  return (
    <Layout title="Blogs">
      <Box position="relative" pb={8}>
        <DynamicCodeRain />
      </Box>

      <Container maxW="container.lg">
        <Box
          borderRadius="lg"
          mb={8}
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
          <code style={{ fontSize: '16px', fontWeight: 'bold' }}>
            $ cat /dev/namtiene/blogs
          </code>
          <p style={{ marginTop: '10px', fontSize: '14px' }}>
            &gt; Thoughts on AI, Competitive Programming, and Tech
          </p>
        </Box>

        <Section delay={0.1}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading as="h2" size="lg" mb={6} color="teal">
                &lt;All Blog Posts /&gt;
              </Heading>

              <SimpleGrid columns={[1, 1, 2]} spacing={6}>
                {blogs.map((blog, index) => (
                  <Box key={index} opacity={blog.href === '#' ? 0.6 : 1}>
                    <BlogCard {...blog} />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            <Box
              p={6}
              borderRadius="lg"
              bg={useColorModeValue('blue.50', 'rgba(0, 0, 255, 0.05)')}
              borderLeft="4px solid"
              borderColor="blue"
              mt={8}
            >
              <Heading as="h3" size="md" mb={2}>
                💡 More Coming Soon
              </Heading>
              <Text>
                I&apos;m constantly working on new articles about AI optimization, competitive programming strategies,
                and innovative tech solutions. Stay tuned!
              </Text>
            </Box>
          </VStack>
        </Section>
      </Container>
    </Layout>
  )
}

export default Blogs
export { getServerSideProps } from '../components/chakra'
