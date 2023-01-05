import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mui/material";
import DefaultTemplate from "@/templates/Default";
import DashboardFilterButtons from "@/templates/Dashboard/FilterButtons";
import DashboardCardGrid from "@/templates/Dashboard/Grid";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Dashboard: NextPage = () => {
  const { data, status } = useSession()
  const user = data?.user
  const { push } = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (status === 'unauthenticated') {
      push('/api/auth/signin')
      return
    }
  }, [push, status, user])

  if (!user) return <><p>Redirecionando ...</p></>

  return (
    <>
      <Head>
        <title>Painel</title>
      </Head>

      <DefaultTemplate disableGutters headerAction={<DashboardFilterButtons />}>
        <Container maxWidth="xl">
          <DashboardCardGrid />
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default Dashboard;
