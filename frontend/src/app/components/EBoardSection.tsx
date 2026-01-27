'use client';

import Link from 'next/link';
import { useState } from 'react';
import { eboardMembers, EboardMember } from '../../../data/EBoardData';

function MemberCard({ member }: { member: EboardMember }) {
    const [isHovered, setIsHovered] = useState(false);

    // get initials from name (fallback if no image)
    const initials = member.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const CardContent = (
        <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
        }}
        >
        {/* Image container */}
        <div 
            style={{
            position: 'relative',
            width: '140px',
            height: '140px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
        >
            {/* show image if available, otherwise show initials */}
            {member.image && !member.image.includes('dicebear') ? (
            // real headshot
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={member.image}
                alt={member.name}
                style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isHovered ? 'brightness(0.5)' : 'brightness(1)',
                transition: 'filter 0.3s ease'
                }}
            />
            ) : (
            // placeholder with initials
            <div
                style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: '600',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                filter: isHovered ? 'brightness(0.5)' : 'brightness(1)',
                transition: 'filter 0.3s ease'
                }}
            >
                {initials}
            </div>
            )}
            
            {/* LinkedIn overlay */}
            {member.linkedin && (
            <div 
                style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease'
                }}
            >
                <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="white"
                >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            </div>
            )}
        </div>
        
        {/* member info */}
        <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: '150px' }}>
            <h3 style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: 0,
            lineHeight: 1.3,
            fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
            {member.name}
            </h3>
            <p style={{ 
            fontSize: '0.75rem', 
            fontWeight: '500', 
            color: '#d97706',
            margin: '4px 0 0 0',
            fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
            {member.position}
            </p>
            <p style={{ 
            fontSize: '0.7rem', 
            color: '#6b7280',
            margin: '2px 0 0 0',
            fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
            {member.year} Year
            </p>
        </div>
        </div>
    );

    if (member.linkedin) {
        return (
        <Link 
            href={member.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
        >
            {CardContent}
        </Link>
        );
    }

    return CardContent;
    }

    export default function EBoardSection() {
    return (
        <section style={{
        padding: '4rem 1rem',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            textAlign: 'center',
            color: '#111827',
            marginBottom: '0.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
            Meet Our Executive Board
            </h2>
            <p style={{
            textAlign: 'center',
            color: '#6b7280',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '0.9rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
            Our leadership team provides professional development and community for Black engineers at Northeastern.
            </p>
            
            {/* griddd */}
            <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1.75rem',
            justifyItems: 'center'
            }}>
            {eboardMembers.map((member, index) => (
                <MemberCard key={index} member={member} />
            ))}
            </div>
        </div>
        </section>
    );
}